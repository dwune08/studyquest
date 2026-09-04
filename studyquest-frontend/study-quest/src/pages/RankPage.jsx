import { useState, useEffect, useCallback } from "react";
import BasicLayout from "../layouts/BasicLayout";
import jwtAxios from "../api/jwtAxios";
import { useAuth } from "../hooks/useAuth";
import { useAuthGuard } from "../hooks/useAuthGuard";

const RankPage = () => {
  useAuthGuard();
  const { studentNo: myStudentNo } = useAuth();

  const ITEMS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const [rankings, setRankings] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalPage: 1,
    prev: false,
    next: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // 데이터 공통 로드 함수
  const loadData = useCallback(async (pageToFetch, isInitial = false) => {
    setIsLoading(true);
    try {
      const params = { size: ITEMS_PER_PAGE };
      
      // 최초 진입이 아닐 때만 명시적인 page 번호를 보냄
      if (!isInitial) {
        params.page = pageToFetch;
      }

      const response = await jwtAxios.get("/ranks", { params });
      const { dtoList, totalPage, prev, next, currentPage: responsePage } = response.data;

      setRankings(dtoList || []);
      setPageInfo({
        totalPage: totalPage || 1,
        prev,
        next,
      });

      // 최초 진입 시 백엔드가 계산해 준 내 진짜 페이지 번호로 동기화
      if (isInitial && responsePage) {
        setCurrentPage(responsePage);
      }
    } catch (error) {
      console.error("랭킹 데이터 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 최초 마운트 시 딱 한 번만 실행 (isInitial을 true로 전달)
  useEffect(() => {
    loadData(1, true);
  }, [loadData]);

  // 이전 페이지 이동 (순환)
  const handlePrev = () => {
    const nextTarget = currentPage <= 1 ? pageInfo.totalPage : currentPage - 1;
    setCurrentPage(nextTarget);
    loadData(nextTarget, false);
  };

  // 다음 페이지 이동 (순환)
  const handleNext = () => {
    const nextTarget = currentPage >= pageInfo.totalPage ? 1 : currentPage + 1;
    setCurrentPage(nextTarget);
    loadData(nextTarget, false);
  };

  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "🎖️";
  };

  return (
    <BasicLayout>
      <div className="w-full flex-1 flex items-center justify-center p-6 bg-slate-950 text-slate-100 font-sans relative selection:bg-blue-500 selection:text-white">
        <div className="absolute w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-lg h-[500px] bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-md relative z-10 flex flex-col justify-between">
          
          <button
            type="button"
            onClick={handlePrev}
            aria-label="이전 페이지"
            className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-800/90 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-lg active:scale-90 cursor-pointer z-20"
          >
            ◀
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="다음 페이지"
            className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-800/90 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-lg active:scale-90 cursor-pointer z-20"
          >
            ▶
          </button>

          <div className="flex items-center justify-between w-full mb-4 px-1">
            <h2 className="text-xl font-bold text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              🏆 학급 주간 랭킹
            </h2>
            <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
              {currentPage} / {pageInfo.totalPage}
            </span>
          </div>

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
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black min-w-[42px] text-slate-400 whitespace-nowrap">
                        {item.rank}위
                      </span>
                      <span className="text-lg">{getMedal(item.rank)}</span>
                    </div>

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

export default RankPage;