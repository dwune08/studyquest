import { useSelector } from "react-redux";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";

const BasicMenu = () => {
   const loginState = useSelector((state) => state.loginSlice);
   const { goHome, goLogin, goQuizList } = useCustomNavigate();

   return (
      <nav>
         <div>
            <ul>
               <li onClick={goHome}>
                  Main
               </li>
               <li onClick={goQuizList}>
                  퀴즈
               </li>
            </ul>
         </div>
         {!loginState.userEmail && (
            <div onClick={goLogin}>
               로그인
            </div>
         )}

         {loginState.userEmail && (
            <div>
               로그아웃
            </div>
         )}
      </nav>
   );
};

export default BasicMenu;