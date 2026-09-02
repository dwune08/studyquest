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
    // 회원번호(userNo)를 전달받아 경로를 구성합니다.
    goModify: (userNo) => navigate(`/users/${userNo}/modify`),
    goQuizList: () => navigate("/quizzes"),
    goQuizRegister: () => navigate("/quizzes/register"),
    goEvent: () => navigate("/event"),
    goRank: () => navigate("/rank"),
    goStudentMyPage: () => navigate("/student"),
    goTeacherPage: () => navigate("/teacher"),
    goQuizDetail: (quizNo) => navigate(`/quizzes/${quizNo}`),
    goBack: () => navigate(-1),
  };
};