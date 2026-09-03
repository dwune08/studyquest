import { useSelector } from "react-redux";
import QuizRegisterComponent from "../../components/quiz/QuizRegisterComponent";
import BasicLayout from "../../layouts/BasicLayout";

const QuizRegisterPage = () => {
  const loginState = useSelector((state) => state.loginSlice);

  const localUserInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );

  const teacherNo =
    loginState?.teacherNo ||
    loginState?.userNo ||
    localUserInfo?.teacherNo ||
    localUserInfo?.userNo ||
    null;

  return (
    <BasicLayout userType={2} showFooter={false}>
      <QuizRegisterComponent teacherNo={teacherNo} />
    </BasicLayout>
  );
};

export default QuizRegisterPage;