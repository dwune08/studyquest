import { useSelector } from "react-redux";
import { getCookie } from "../utils/cookieUtil";

export const useAuth = () => {
  // 1. Redux에서 로그인 정보 가져오기
  const reduxUser = useSelector((state) => state.loginSlice) || {};

  // 2. LocalStorage에서 저장된 정보 가져오기 (문자열인 경우 JSON 파싱 예외 처리)
  let storedUser = {};
  try {
    const rawData = localStorage.getItem("userInfo") || localStorage.getItem("member");
    if (rawData) {
      storedUser = JSON.parse(rawData);
    }
  } catch (e) {
    console.error("userInfo 파싱 에러:", e);
  }

  // 3. Cookie에서 가져오기
  const memberCookie = getCookie("member") || {};

  // 데이터 통합 (Redux 우선 -> LocalStorage -> Cookie)
  const user = {
    ...memberCookie,
    ...storedUser,
    ...reduxUser,
  };

  // 백엔드 엔드포인트/응답 필드명 보장
  const studentNo = user.studentNo || user.userNo || user.no || null;
  const teacherNo = user.teacherNo || user.userNo || user.no || null;
  const currentNo = user.studentNo || user.teacherNo || user.userNo || user.no || null;

  return {
    user,
    studentNo,
    teacherNo,
    currentNo,
    isAuthenticated: Boolean(currentNo),
    isStudent: user.userType === 1 || user.userType === "student" || user.role === "STUDENT",
    isTeacher: user.userType === 2 || user.userType === "teacher" || user.role === "TEACHER",
  };
};