import { useState } from "react";
import BasicLayout from "../layouts/BasicLayout";

const MainDashboardPage = () => {
  const weeklyRankings = [
    { rank: 1, medal: "🥇", name: "이영희", level: 35, isMe: false },
    { rank: 2, medal: "🥈", name: "김철수", level: 31, isMe: true },
    { rank: 3, medal: "🥉", name: "최명희", level: 28, isMe: false },
    { rank: 4, medal: "🎖️", name: "박지훈", level: 25, isMe: false },
    { rank: 5, medal: "🎖️", name: "정민수", level: 24, isMe: false },
    { rank: 6, medal: "🎖️", name: "한서윤", level: 22, isMe: false },
    { rank: 7, medal: "🎖️", name: "강현우", level: 20, isMe: false },
    { rank: 8, medal: "🎖️", name: "윤아름", level: 19, isMe: false },
    { rank: 9, medal: "🎖️", name: "임하은", level: 17, isMe: false },
    { rank: 10, medal: "🎖️", name: "오도현", level: 16, isMe: false },
    { rank: 11, medal: "🎖️", name: "송지우", level: 15, isMe: false },
    { rank: 12, medal: "🎖️", name: "신유진", level: 13, isMe: false },
    { rank: 13, medal: "🎖️", name: "권태양", level: 11, isMe: false },
    { rank: 14, medal: "🎖️", name: "황보람", level: 10, isMe: false },
    { rank: 15, medal: "🎖️", name: "안성민", level: 8, isMe: false },
    { rank: 16, medal: "🎖️", name: "유다은", level: 7, isMe: false },
    { rank: 17, medal: "🎖️", name: "배준호", level: 5, isMe: false },
    { rank: 18, medal: "🎖️", name: "조수빈", level: 4, isMe: false },
    { rank: 19, medal: "🎖️", name: "예지환", level: 3, isMe: false },
    { rank: 20, medal: "🎖️", name: "이찬수", level: 1, isMe: false },
  ];

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(weeklyRankings.length / ITEMS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const currentRankings = weeklyRankings.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <BasicLayout>
      <div className="w-full flex-1 flex items-center justify-center p-6 bg-slate-950 text-slate-100 font-sans relative selection:bg-blue-500 selection:text-white">
        
        {/* 배경 오로라 */}
        <div className="absolute w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* 메인 카드 (h-[500px] 고정 및 고정 수치 반영) */}
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
              {currentPage + 1} / {totalPages}
            </span>
          </div>

          {/* 리스트 영역 (h-[380px] 고정, content-start 정렬) */}
          <div className="w-full h-[380px] flex flex-col justify-start gap-2.5">
            {currentRankings.map((item) => (
              <div
                key={item.rank}
                className={`h-[52px] flex items-center justify-between px-4 rounded-xl border transition-all ${
                  item.isMe
                    ? "bg-blue-950/60 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)] text-blue-200"
                    : "bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                {/* 순위 & 메달 */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black min-w-[42px] text-slate-400 whitespace-nowrap">
                    {item.rank}위
                  </span>
                  <span className="text-lg">{item.medal}</span>
                </div>

                {/* 이름 & 레벨 */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {item.name}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {item.isMe ? "(ME)" : `(Lv. ${item.level})`}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </BasicLayout>
  );
};

export default MainDashboardPage;