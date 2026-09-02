import { useState, useEffect, useCallback } from "react";
import BasicLayout from "../layouts/BasicLayout";
import jwtAxios from "../api/jwtAxios";

const MainDashboardPage = () => {
  const ITEMS_PER_PAGE = 6;
  
  // PageRequestDTO의 기본 page는 1부터 시작
  const [currentPage, setCurrentPage] = useState(1); 
  const [rankings, setRankings] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalPage: 1,
    prev: false,
    next: false,
    prevPage: 1,
    nextPage: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  // 로컬스토리지에서 로그인한 내 정보 가져오기
  const storedUser = localStorage.getItem("userInfo");
  const myStudentNo = storedUser ? JSON.parse(storedUser).userNo : null;

  // 랭킹 데이터 불러오기 함수
  const fetchRankings = useCallback(async (page) => {
    setIsLoading(true);
    try {
      // GET /ranks?page=1&size=6
      const response = await jwtAxios.get("/ranks", {
        params: {
          page: page,
          size: ITEMS_PER_PAGE,
        },
      });

      // 백엔드 PageResponseDTO 응답 필드 매핑
      const { dtoList, totalPage, prev, next, prevPage, nextPage } = response.data;
      
      setRankings(dtoList || []);
      setPageInfo({
        totalPage: totalPage || 1,
        prev,
        next,
        prevPage,
        nextPage,
      });
    } catch (error) {
      console.error("랭킹 데이터 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 페이지 변경 시 API 재호출
  useEffect(() => {
    fetchRankings(currentPage);
  }, [currentPage, fetchRankings]);

  // 이전 페이지 이동 핸들러 (루프 순환 방식)
  const handlePrev = () => {
    setCurrentPage((prev) => (prev <= 1 ? pageInfo.totalPage : prev - 1));
  };

  // 다음 페이지 이동 핸들러 (루프 순환 방식)
  const handleNext = () => {
    setCurrentPage((prev) => (prev >= pageInfo.totalPage ? 1 : prev + 1));
  };

  // 순위에 따른 메달 반환 함수
  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "🎖️";
  };

  return (
    <BasicLayout>
      <div className="w-full flex-1 flex items-center justify-center p-6 bg-slate-950 text-slate-100 font-sans relative selection:bg-blue-500 selection:text-white">
        
        {/* 배경 오로라 */}
        <div className="absolute w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* 메인 카드 */}
        <div className="w-full max-w-lg h-[500px] bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md relative z-10 flex flex-col justify-between">
          
          {/* 이전 화살표 */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="이전 페이지"
            className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-800/90 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-lg active:scale-90 cursor-pointer z-20"
          >
            ◀
          </button>

          {/* 다음 화살표 */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="다음 페이지"
            className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-800/90 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-lg active:scale-90 cursor-pointer z-20"
          >
            ▶
          </button>

          {/* 카드 상단 타이틀 바 */}
          <div className="flex items-center justify-between w-full mb-4 px-1">
            <h2 className="text-xl font-bold text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              🏆 학급 주간 랭킹
            </h2>
            <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
              {currentPage} / {pageInfo.totalPage}
            </span>
          </div>

          {/* 리스트 영역 */}
          <div className="w-full h-[380px] flex flex-col justify-start gap-2.5">
            {isLoading ? (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                랭킹 데이터를 불러오는 중...
              </div>
            ) : rankings.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                등록된 랭킹 데이터가 없습니다.
              </div>
            ) : (
              rankings.map((item) => {
                const isMe = item.studentNo === myStudentNo;

                return (
                  <div
                    key={item.studentNo || item.rank}
                    className={`h-[52px] flex items-center justify-between px-4 rounded-xl border transition-all ${
                      isMe
                        ? "bg-blue-950/60 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)] text-blue-200"
                        : "bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/50"
                    }`}
                  >
                    {/* 순위 & 메달 */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black min-w-[42px] text-slate-400 whitespace-nowrap">
                        {item.rank}위
                      </span>
                      <span className="text-lg">{getMedal(item.rank)}</span>
                    </div>

                    {/* 이름 & 레벨 */}
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">
                        {item.studentName}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {isMe ? "(ME)" : `(Lv. ${item.level})`}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
    </BasicLayout>
  );
};

export default MainDashboardPage;