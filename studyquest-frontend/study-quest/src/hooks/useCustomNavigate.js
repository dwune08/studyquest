import { useNavigate } from "react-router-dom";

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  return {
    goHome: () => navigate("/"),
    goLogin: () => navigate("/users/login"),
    goQuizList: () => navigate("/quizzes"), // 👈 /quizzes/list 대신 /quizzes 사용
    goEvent: () => navigate("/event"),
    goStudentMyPage: () => navigate("/student/mypage"),
    goQuizDetail: (quizNo) => navigate(`/quizzes/${quizNo}`),
    goBack: () => navigate(-1),
  };
};
