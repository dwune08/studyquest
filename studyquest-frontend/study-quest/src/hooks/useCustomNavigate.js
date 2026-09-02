import { useNavigate } from "react-router-dom";

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  return {
    goHome: () => navigate("/"),
    goLogin: (param) => {
      if (param?.tab === "join") {
        navigate("/users/login?tab=join");
      } else {
        navigate("/users/login");
      }
    },
    goQuizList: () => navigate("/quizzes"),
    goQuizRegister: () => navigate("/quizzes/register"),
    goEvent: () => navigate("/event"),
    goStudentMyPage: () => navigate("/student/mypage"),
    goTeacherPage: () => navigate("/teacher"),
    goQuizDetail: (quizNo) => navigate(`/quizzes/${quizNo}`),
    goBack: () => navigate(-1),
  };
};