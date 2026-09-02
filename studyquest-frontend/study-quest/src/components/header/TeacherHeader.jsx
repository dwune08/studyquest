import { useCustomNavigate } from "../../hooks/useCustomNavigate";

const TeacherHeader = ({
  teacherName = "선생님",
  assignedGrade = "3학년",
  onLogout,
}) => {
  const { goLogin } = useCustomNavigate();

  const handleLogout = (e) => {
    if (onLogout) {
      onLogout(e);
    } else {
      localStorage.clear();
      goLogin();
    }
  };

  return (
    <header className="h-14 bg-[#0d1322] border-b border-gray-800/80 px-8 flex items-center justify-between text-sm w-full font-sans">
      {/* 1. 왼쪽: 로고 & ADMIN 태그 */}
      <div className="flex items-center gap-3">
        <span className="text-xl">🗡️</span>
        <span className="font-extrabold text-base tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-blue-300">
          STUDY:QUEST
        </span>
        <span className="px-2 py-0.5 bg-blue-950/80 border border-blue-500/40 rounded text-xs text-blue-400 font-bold ml-2">
          ADMIN
        </span>
      </div>

      {/* 2. 중앙: 담당 정보 */}
      <div className="text-gray-300 font-medium text-xs">
        {assignedGrade} 담당 [{teacherName}]
      </div>

      {/* 3. 오른쪽: 로그아웃 버튼 */}
      <button
        type="button"
        onClick={handleLogout}
        className="px-3 py-1 bg-[#161f33] border border-gray-700/60 hover:border-gray-500 rounded text-xs text-gray-300 hover:text-rose-400 transition-all cursor-pointer"
      >
        로그아웃
      </button>
    </header>
  );
};

export default TeacherHeader;