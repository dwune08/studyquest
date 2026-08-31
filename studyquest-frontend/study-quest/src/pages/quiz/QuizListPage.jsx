import { useSearchParams } from "react-router";
import BasicLayout from "../../layouts/BasicLayout";

const QuizListPage = () => {
  const [queryParams] = useSearchParams();

  const page = parseInt(queryParams.get("page")) || 1;
  const size = parseInt(queryParams.get("size")) || 10;

  return (
    <BasicLayout>
         <div className='text-3xl'>
            퀴즈 리스트 {page} --- {size}
         </div>
    </BasicLayout>
  );
};

export default QuizListPage;
