import { useParams } from "react-router"
import BasicLayout from "../../layouts/BasicLayout";

const QuizDetailPage = () => {
   const { no } = useParams();
   return (
      <BasicLayout>
         <div className='text-3xl'>
            {no}번 Quiz
         </div>
      </BasicLayout>
   );
};
export default QuizDetailPage;
