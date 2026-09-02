import FooterMenu from "../components/menus/FooterMenu";
import TopMenu from "../components/menus/TopMenu";
import { useCustomNavigate } from "../hooks/useCustomNavigate";

const BasicLayout = ({ children, userInfo, onAttendanceClick, onQuizDungeonClick, onLogout }) => {
  const { goEvent, goQuizList } = useCustomNavigate();

  const handleAttendance = (e) => {
    if (onAttendanceClick) onAttendanceClick(e);
    goEvent();
  };

  const handleQuizDungeon = (e) => {
    if (onQuizDungeonClick) onQuizDungeonClick(e);
    goQuizList();
  };

  return (
    <div className="w-screen h-screen min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden font-sans">
      
      {/* 상단 헤더 영역 (userInfo 전달 가능) */}
      <TopMenu {...userInfo} onLogout={onLogout} />

      {/* 메인 컨테이너 */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          {children}
        </main>

        {/* 하단 메뉴 */}
        <nav className="shrink-0 w-full">
          <FooterMenu 
            onAttendanceClick={handleAttendance}
            onQuizDungeonClick={handleQuizDungeon}
          />
        </nav>
      </div>
    </div>
  );
};

export default BasicLayout;