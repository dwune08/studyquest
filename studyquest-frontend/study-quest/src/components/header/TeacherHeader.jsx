import { useCustomNavigate } from "../../hooks/useCustomNavigate";

const TeacherHeader = ({
  userName = "선생님",
  subInfo = "3학년 담당",
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
    <header className="h-14 bg-[#0d1322] border-b border-gray-800/80 px-8 grid grid-cols-3 items-center text-sm w-full shrink-0">
      <div className="flex items-center gap-3 justify-self-start">
        <span className="text-xl">🗡️</span>
        <span className="font-extrabold text-base tracking-wider">STUDY:QUEST</span>
        <span className="px-2 py-0.5 bg-blue-950/80 border border-blue-500/40 rounded text-xs text-blue-400 font-bold ml-2">
          ADMIN
        </span>
      </div>

      <div className="text-gray-300 font-medium text-xs justify-self-center">
        {subInfo} [{userName}]
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="justify-self-end px-3 py-1 px-3 py-1 bg-[#161f33] border border-gray-700/60 hover:border-gray-500 rounded text-xs text-gray-300 transition-all cursor-pointer"
      >
        로그아웃
      </button>
    </header>
  );
};

export default TeacherHeader;