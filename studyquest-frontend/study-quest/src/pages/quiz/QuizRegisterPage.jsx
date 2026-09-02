import { useSelector } from "react-redux";
import QuizRegisterComponent from "../../components/quiz/QuizRegisterComponent";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";

const QuizRegisterPage = () => {
  const { goLogin } = useCustomNavigate();

  // Redux에서 로그인한 교사 정보 가져오기
  const loginState = useSelector((state) => state.loginSlice);
  
  // 새로고침 대비 localStorage에서도 백업으로 가져오기
  const localUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  // userName 또는 name 모두 대응, localStorage 값까지 폴백으로 활용
  const teacherName = loginState?.userName || loginState?.name || localUserInfo?.userName || "선생님";
  const teacherGrade = loginState?.teacherGrade || localUserInfo?.teacherGrade || 1;
  const teacherNo = loginState?.teacherNo || loginState?.userNo || localUserInfo?.teacherNo || localUserInfo?.userNo || null;

  const handleLogout = () => {
    localStorage.clear();
    goLogin();
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-white font-sans">
      {/* 상단 헤더 */}
      <header className="h-14 bg-[#0d1322] border-b border-gray-800/80 px-8 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span className="text-xl">🗡️</span>
          <span className="font-extrabold text-base tracking-wider">
            STUDY:QUEST
          </span>
          <span className="px-2 py-0.5 bg-blue-950/80 border border-blue-500/40 rounded text-xs text-blue-400 font-bold ml-2">
            ADMIN
          </span>
        </div>

        <div className="text-gray-300 font-medium text-xs">
          {teacherGrade}학년 담당 [{teacherName}]
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="px-3 py-1 bg-[#161f33] border border-gray-700/60 hover:border-gray-500 rounded text-xs text-gray-300 transition-all cursor-pointer"
        >
          로그아웃
        </button>
      </header>

      {/* Props로 teacherNo 전달 */}
      <QuizRegisterComponent teacherNo={teacherNo} />
    </div>
  );
};

export default QuizRegisterPage;