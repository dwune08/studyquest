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
      goQuizList: () => navigate("/quizzes/list"),
      goBack: () => navigate(-1), 
   };
};
