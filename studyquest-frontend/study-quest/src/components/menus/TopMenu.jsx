import { useCustomNavigate } from "../../hooks/useCustomNavigate";

const TopMenu = ({ 
  userName = "김철수", 
  userLevel = 31, 
  currentExp = 450, 
  maxExp = 1000,
  onLogout 
}) => {
  const { goLogin } = useCustomNavigate();
  const expPercentage = Math.min((currentExp / maxExp) * 100, 100);

  const handleLogout = (e) => {
    if (onLogout) {
      onLogout(e);
    } else {
      // 기본 동작: 로그인 페이지로 이동
      goLogin();
    }
  };

  return (
    <header className="w-full bg-slate-900/90 border-b border-slate-800/80 px-8 py-3.5 grid grid-cols-3 items-center shadow-lg relative z-10 shrink-0 font-sans">
      
      {/* 1. 왼쪽: 타이틀 & 레벨 */}
      <div className="flex items-center gap-3 justify-start">
        <span className="text-xl filter drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">🗡️</span>
        <span className="text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-blue-300 whitespace-nowrap cursor-pointer">
          STUDY:QUEST
        </span>
        <span className="text-xs font-bold bg-blue-950/80 border border-blue-500/40 text-blue-300 px-3 py-1 rounded-full whitespace-nowrap">
          [Lv. {userLevel}] {userName}
        </span>
      </div>

      {/* 2. 중앙: 경험치 바 */}
      <div className="flex items-center justify-center gap-3 w-full max-w-sm justify-self-center">
        <span className="text-xs font-black text-slate-400 tracking-wider shrink-0">EXP</span>
        <div className="w-full bg-slate-950 border border-slate-800 rounded-full h-3.5 relative overflow-hidden p-0.5 shadow-inner">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            style={{ width: `${expPercentage}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-slate-300 tracking-wider shrink-0 whitespace-nowrap">
          {currentExp} / {maxExp}
        </span>
      </div>

      {/* 3. 오른쪽: 로그아웃 버튼 */}
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={handleLogout}
          className="text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors cursor-pointer border border-slate-800 hover:border-rose-900/50 rounded-lg px-3.5 py-1.5 bg-slate-950/50 shrink-0"
        >
          로그아웃
        </button>
      </div>

    </header>
  );
};

export default TopMenu;