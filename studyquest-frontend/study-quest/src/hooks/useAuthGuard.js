import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useAuthGuard = (redirectTo = "/users/login") => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth(); // useAuth를 통해 인증 상태 확인

  useEffect(() => {
    // 1. 이미 로그인 페이지에 있다면 Guard 실행하지 않음
    if (location.pathname === redirectTo) return;

    // 2. 인증되지 않은 사용자인 경우
    if (!isAuthenticated) {
      alert("로그인이 필요한 서비스입니다.");
      
      // 로그인 완료 후 원래 접근하려던 페이지로 돌아오기 위해 state로 현재 경로 전달
      navigate(redirectTo, {
        replace: true,
        state: { from: location },
      });
    }
  }, [isAuthenticated, navigate, location, redirectTo]);

  return { isLogin: isAuthenticated };
};