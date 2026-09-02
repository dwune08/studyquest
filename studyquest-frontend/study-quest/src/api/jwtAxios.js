import axios from 'axios';

// 1. 공통 Axios 인스턴스 생성
const jwtAxios = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 재발급 진행 여부 플래그 및 대기 중인 요청 큐(Queue)
let isRefreshing = false;
let failedQueue = [];

// 대기열에 쌓인 요청들을 처리하는 함수
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

// 인증 실패 시 로컬 데이터 정리 및 로그인 페이지 이동
const handleAuthError = (message) => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userInfo');
  
  if (message) alert(message);
  window.location.href = '/users/login'; // 프로젝트 라우트 경로에 맞게 수정
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

    // 401 Unauthorized 에러 발생 시 (재발급 요청 실패 등 예외)
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // 이미 토큰 재발급이 진행 중이라면, 이후 401 요청들은 큐에 대기시킴
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
        // Refresh Token이 없으면 로그인 화면으로 이동
        handleAuthError('로그인 세션이 만료되었습니다. 다시 로그인해 주세요.');
        return Promise.reject(error);
      }

      try {
        // 인터셉터가 없는 순수 axios로 재발급 요청
        const response = await axios.post('http://localhost:8080/users/refresh', {
          accessToken: currentAccessToken,
          refreshToken: refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        // 새로운 토큰 저장
        localStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        // 대기열 요청 처리
        processQueue(null, newAccessToken);

        // 첫 번째 실패 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return jwtAxios(originalRequest);

      } catch (refreshError) {
        // 대기열의 모든 요청 거부 처리
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