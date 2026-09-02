import { useCustomNavigate } from "../../hooks/useCustomNavigate";

const FooterMenu = ({ onAttendanceClick, onQuizDungeonClick }) => {
  const { goQuizList, goEvent } = useCustomNavigate();

  // 1. 출석체크 버튼 클릭 처리
  const handleAttendanceClick = (e) => {
    if (onAttendanceClick) {
      onAttendanceClick(e); // 상위에서 전달한 함수가 있다면 먼저 실행
    }
    goEvent(); // 페이지 이동 처리
  };

  // 2. 퀴즈 던전 버튼 클릭 처리
  const handleQuizDungeonClick = (e) => {
    if (onQuizDungeonClick) {
      onQuizDungeonClick(e); // 상위에서 전달한 함수 실행
    }
    goQuizList(); // 페이지 이동 처리
  };

  return (
    <footer className="w-full bg-slate-900/90 border-t border-slate-800/80 px-8 py-4 flex items-center justify-center gap-6 relative z-10 shrink-0">
      <button
        type="button"
        onClick={handleAttendanceClick}
        className="flex-1 max-w-sm py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer text-center"
      >
        📜 일일 퀘스트 보상 수령
      </button>

      <button
        type="button"
        onClick={handleQuizDungeonClick}
        className="flex-1 max-w-sm py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/40 text-white font-bold text-sm tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(37,99,235,0.4)] active:scale-[0.98] cursor-pointer text-center"
      >
        ⚔️ 퀴즈 던전 입장
      </button>
    </footer>
  );
};

export default FooterMenu;