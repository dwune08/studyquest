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
    goModify: () => navigate("/users/:no/modify"),
    goQuizList: () => navigate("/quizzes"),
    goQuizRegister: () => navigate("/quizzes/register"),
    goEvent: () => navigate("/event"),
    goStudentMyPage: () => navigate("/student"),
    goTeacherPage: () => navigate("/teacher"),
    goQuizDetail: (quizNo) => navigate(`/quizzes/${quizNo}`),
    goBack: () => navigate(-1),
  };
};