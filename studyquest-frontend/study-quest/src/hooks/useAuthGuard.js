import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login", { replace: true }); // 뒤로가기로 접근 방지
    }
  }, [token, navigate]);

  return { isLogin: !!token };
};