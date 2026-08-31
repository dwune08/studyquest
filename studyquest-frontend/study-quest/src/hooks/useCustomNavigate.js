import { useNavigate } from "react-router";

export const useCustomNavigate = () => {
   const navigate = useNavigate();

   return {
      goHome: () => navigate("/"),
      goLogin: () => navigate("/users/login"),
      goQuizList: () => navigate("/quizzes/list"),
      goBack: () => navigate(-1), 
   };
};