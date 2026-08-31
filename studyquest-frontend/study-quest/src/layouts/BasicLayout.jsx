import FooterMenu from "../components/menus/FooterMenu";
import BasicMenu from "../components/menus/TopMenu";

const BasicLayout = ({ children }) => {
  return (
    /* 1. 최외각 컨테이너: 화면 전체 높이(100vh) 고정 + flex 컬럼 배치 + 배경색 어둡게 지정 */
    <div className="w-screen h-screen min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden font-sans">
      
      {/* 화면 상단 공통 헤더 영역 */}
      <BasicMenu />

      {/* 본문 및 하단 메뉴 감싸는 메인 컨테이너 (남은 높이를 flex-1로 전담) */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        
        {/* 본문 (중앙 정렬 및 여백 확보) */}
        <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          {children}
        </main>

        {/* 하단 메뉴 (바닥 고정) */}
        <nav className="shrink-0 w-full">
          <FooterMenu />
        </nav>

      </div>
    </div>
  );
};

export default BasicLayout;