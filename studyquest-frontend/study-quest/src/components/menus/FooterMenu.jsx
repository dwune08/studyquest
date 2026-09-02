const FooterMenu = ({ onAttendanceClick, onQuizDungeonClick }) => {
  return (
    <footer className="w-full bg-slate-900/90 border-t border-slate-800/80 px-8 py-4 flex items-center justify-center gap-6 relative z-10 shrink-0">
      <button
        type="button"
        onClick={onAttendanceClick}
        className="flex-1 max-w-sm py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer text-center"
      >
        📅 출석체크하기
      </button>

      <button
        type="button"
        onClick={onQuizDungeonClick}
        className="flex-1 max-w-sm py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-400/40 text-white font-bold text-sm tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(37,99,235,0.4)] active:scale-[0.98] cursor-pointer text-center"
      >
        ⚔️ 퀴즈 던전 입장
      </button>
    </footer>
  );
};

export default FooterMenu;