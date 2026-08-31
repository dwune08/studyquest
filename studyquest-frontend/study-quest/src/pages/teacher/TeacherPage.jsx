import { useParams } from "react-router"
import { Outlet } from "react-router";
import BasicLayout from "../../layouts/BasicLayout";

const TeacherPage = () => {
   const {no} = useParams();
   return (
      <BasicLayout>
         {/* 선생님 페이지 하위 메뉴들 */}
         <div>
            {no}번 선생님 페이지
            <div>
               학년 통계
            </div>
            <div>
               퀴즈 관리
            </div>
            <div>
               학생 관리
            </div>
         </div>

         {/* 하위 페이지 표시되는 영역 */}
         <div>
            <Outlet />
         </div>
      </BasicLayout>
   );
};

export default TeacherPage;
