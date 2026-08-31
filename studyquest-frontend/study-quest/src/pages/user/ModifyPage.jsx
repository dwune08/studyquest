import { useParams } from "react-router";
import BasicLayout from "../../layouts/BasicLayout";

const ModifyPage = () => {
   const {no} = useParams();
   return (
      <BasicLayout>
         <div className='text-3xl'>
            <div>{no}번 회원정보 수정</div>
         </div>
      </BasicLayout>
   );
};

export default ModifyPage;
