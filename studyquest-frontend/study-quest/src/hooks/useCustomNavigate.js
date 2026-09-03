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
    goStudentMyPage: () => navigate("/student"),
    goModify: (userNo) => navigate(`/users/${userNo}/modify`),
    
    goTeacherPage: () => navigate("/teacher"),
    
    goEvent: () => navigate("/event"),
    
    goRank: () => navigate("/rank"),
    
    goQuizList: () => navigate("/quizzes"),
    goQuizDetail: (quizNo) => navigate(`/quizzes/${quizNo}`),
    goQuizRegister: () => navigate("/quizzes/register"),

    // 💡 퀴즈 결과 페이지 이동 메서드 추가
    goQuizResult: (quizNo, stateData) => 
      navigate(`/quizzes/${quizNo}/result`, { state: stateData }),
    
    goBack: () => navigate(-1),
  };
};