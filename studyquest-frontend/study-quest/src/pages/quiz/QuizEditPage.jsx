import { useParams } from "react-router";
import BasicLayout from "../../layouts/BasicLayout"

const QuizEditPage = () => {
   const { no } = useParams();
   return (
      <div>
         <BasicLayout>
            <div className='text-3xl'>
               {no}번 Quiz 수정
            </div>
         </BasicLayout>
      </div>
   );
};

export default QuizEditPage;
