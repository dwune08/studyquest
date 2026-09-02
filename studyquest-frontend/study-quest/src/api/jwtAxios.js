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

// 2. Request Interceptor: 모든 요청 발송 전 Access Token 자동 첨부
jwtAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: 응답 에러 처리 (토큰 만료 시 자동 재발급)
jwtAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 에러 발생 시
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

      if (refreshToken) {
        try {
          // Refresh Token으로 새로운 Access Token 발급 요청
          const response = await axios.post('http://localhost:8080/users/refresh', {
            refreshToken: refreshToken,
          });

          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;

          // 새로운 토큰 로컬스토리지 저장
          localStorage.setItem('accessToken', newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }

          // 대기열에 들어있던 다른 요청들에 새로 발급받은 Access Token 전달 후 재요청
          processQueue(null, newAccessToken);

          // 실패했던 첫 번째 요청의 Authorization 헤더 교체 후 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return jwtAxios(originalRequest);

        } catch (refreshError) {
          // 대기열의 모든 요청 거부 처리
          processQueue(refreshError, null);
          console.error('토큰 재발급 실패: 로그인 세션이 만료되었습니다.', refreshError);
          
          // Refresh Token도 만료되었거나 유효하지 않은 경우 저장소 비우고 로그인으로 이동
          localStorage.clear();
          alert('로그인 세션이 만료되었습니다. 다시 로그인해 주세요.');
          window.location.href = '/users/login';
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        // Refresh Token이 없으면 바로 로그인 화면으로 이동
        localStorage.clear();
        window.location.href = '/users/login';
      }
    }

    return Promise.reject(error);
  }
);

export default jwtAxios;