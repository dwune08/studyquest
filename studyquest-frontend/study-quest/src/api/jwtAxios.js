import axios from 'axios';

// 1. 공통 Axios 인스턴스 생성
const jwtAxios = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

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

    // 401 Unauthorized 에러 발생 및 토큰 재발급을 시도한 적이 없을 때
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

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

          // 실패했던 이전 요청의 Authorization 헤더 교체 후 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return jwtAxios(originalRequest);

        } catch (refreshError) {
          console.error('토큰 재발급 실패: 로그인 세션이 만료되었습니다.', refreshError);
          
          // Refresh Token도 만료되었거나 유효하지 않은 경우 저장소 비우고 로그인으로 이동
          localStorage.clear();
          alert('로그인 세션이 만료되었습니다. 다시 로그인해 주세요.');
          window.location.href = '/users/login';
          return Promise.reject(refreshError);
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