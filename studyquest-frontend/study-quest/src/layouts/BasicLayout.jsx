import FooterMenu from "../components/menus/FooterMenu";
import TopMenu from "../components/menus/TopMenu";
import { useCustomNavigate } from "../hooks/useCustomNavigate";

const BasicLayout = ({ children, userInfo, onAttendanceClick, onQuizDungeonClick, onLogout, userType }) => {
  const { goEvent, goQuizList } = useCustomNavigate();

  const handleAttendance = (e) => {
    if (onAttendanceClick) onAttendanceClick(e);
    goEvent();
  };

  const handleQuizDungeon = (e) => {
    if (onQuizDungeonClick) onQuizDungeonClick(e);
    goQuizList();
  };

  // 💡 userInfo.userType이 있으면 그걸 쓰고, 없으면 직접 전달된 userType Prop을 사용
  const finalUserType = userInfo?.userType ?? userType;

  return (
    <div className="w-screen h-screen min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden font-sans">
      
      {/* 상단 헤더 영역 */}
      <TopMenu {...userInfo} onLogout={onLogout} />

      {/* 메인 컨테이너 */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          {children}
        </main>

        {/* 하단 메뉴 */}
        <nav className="shrink-0 w-full">
          <FooterMenu 
            userType={finalUserType}
            onAttendanceClick={handleAttendance}
            onQuizDungeonClick={handleQuizDungeon}
          />
        </nav>
      </div>
    </div>
  );
};

export default BasicLayout;