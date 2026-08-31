import { useNavigate } from "react-router-dom";

export const useCustomNavigate = () => {
   const navigate = useNavigate();

   return {
      goHome: () => navigate("/"),
      goLogin: () => navigate("/users/login"),
      goQuizList: () => navigate("/quizzes/list"),
      goBack: () => navigate(-1), 
   };
};