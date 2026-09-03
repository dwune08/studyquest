import axios from 'axios';

// 1. 공통 Axios 인스턴스 생성
const jwtAxios = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const handleAuthError = (message) => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userInfo');
  
  if (message) alert(message);
  window.location.href = '/users/login';
};

// 2. Request Interceptor: 모든 요청 발송 전 Access Token 자동 첨부
jwtAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: 응답 에러 처리 (토큰 만료 시 자동 재발급)
jwtAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // 💡 401 Unauthorized 또는 403 Forbidden 시 재발급 로직 진입
    if ((status === 401 || status === 403) && !originalRequest._retry) {
      
      // 이미 토큰 재발급 진행 중이면 큐에 대기
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return jwtAxios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');
      const currentAccessToken = localStorage.getItem('accessToken');

      if (!refreshToken) {
        isRefreshing = false;
        handleAuthError('로그인 세션이 만료되었습니다. 다시 로그인해 주세요.');
        return Promise.reject(error);
      }

      try {
        // 인터셉터가 적용되지 않은 기본 axios 사용 (무한 루프 방지)
        const response = await axios.post('http://localhost:8080/users/refresh', {
          accessToken: currentAccessToken,
          refreshToken: refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        // 새 토큰 저장
        localStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        // 큐에 대기 중인 요청들 재실행
        processQueue(null, newAccessToken);

        // 첫 번째 실패한 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return jwtAxios(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError, null);
        console.error('토큰 재발급 실패:', refreshError);
        
        handleAuthError('로그인 세션이 만료되었습니다. 다시 로그인해 주세요.');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default jwtAxios;