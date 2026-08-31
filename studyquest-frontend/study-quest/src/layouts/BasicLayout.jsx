import BasicMenu from "../components/menus/BasicMenu";

BasicMenu
const BasicLayout = ({ children }) => {
  return (
    <div>
      {/* 화면 상단 공통 헤더 영역 */}
      <BasicMenu></BasicMenu>

      <div>
         {/* 본문 */}
         <main>
            {children}
         </main>

         {/* 하단 메뉴 */}
         <nav>
            <h1>하단 메뉴바 영역</h1>
         </nav>
      </div>
    </div>
  );
};

export default BasicLayout;
