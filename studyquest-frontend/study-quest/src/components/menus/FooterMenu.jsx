import { useCustomNavigate } from "../../hooks/useCustomNavigate";

const FooterMenu = ({ onAttendanceClick, onQuizDungeonClick, userType }) => {
  const { goQuizList, goEvent, goQuizRegister } = useCustomNavigate();

  // 1. 출석체크 버튼 클릭 처리
  const handleAttendanceClick = (e) => {
    if (onAttendanceClick) {
      onAttendanceClick(e);
    }
    goEvent();
  };

  // 2. 퀴즈 던전 버튼 클릭 처리 (학생용)
  const handleQuizDungeonClick = (e) => {
    if (onQuizDungeonClick) {
      onQuizDungeonClick(e);
    }
    goQuizList();
  };

  // 선생님용 푸터
  if (userType === 2) {
    return (
      <footer className="w-full bg-slate-900/90 border-t border-slate-800/80 px-8 py-4 flex justify-end gap-6 relative z-10 shrink-0">
        <button
          type="button"
          onClick={goQuizRegister}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all cursor-pointer active:scale-95"
        >
          🔮 신규 던전 생성
        </button>
      </footer>
    );
  }

  // 학생용 푸터
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