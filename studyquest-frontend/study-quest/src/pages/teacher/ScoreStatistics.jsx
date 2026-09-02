export default function ScoreStatistics() {
  // QUIZ + RESULT 집계 데이터
  const statisticsData = [
    {
      quizNo: 1,
      quizTitle: "2차 방정식의 해 구하기",
      quizType: 1, // 5지 선다
      totalSubmissions: 25,
      correctSubmissions: 23,
      percent: 92,
    },
    {
      quizNo: 2,
      quizTitle: "피타고라스 정리",
      quizType: 2, // O / X
      totalSubmissions: 25,
      correctSubmissions: 8,
      percent: 30,
    },
    {
      quizNo: 3,
      quizTitle: "삼각비의 기본 개념",
      quizType: 3, // 단답형
      totalSubmissions: 25,
      correctSubmissions: 13,
      percent: 50,
    },
  ];

  const getTypeName = (type) => {
    if (type === 1) return "5지 선다";
    if (type === 2) return "O / X";
    return "단답형";
  };

  return (
    <div className="h-full flex flex-col justify-between gap-6">
      {/* 1. 상단 제목 */}
      <div className="flex justify-between items-center border-b border-gray-800/80 pb-4 shrink-0">
        <h3 className="font-bold text-gray-100 text-lg flex items-center gap-2">
          <span>📊</span> 문항별(QUIZ_NO) 정답률 통계
        </h3>
        <span className="text-xs px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 rounded-full font-bold">
          RESULT 데이터 기반 실시간 집계
        </span>
      </div>

      {/* 2. 통계 요약 카드 */}
      <div className="grid grid-cols-3 gap-4 shrink-0">
        <div className="bg-[#0b101d] border border-blue-900/40 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400 font-medium">총 출제 문항 수</p>
            <p className="text-2xl font-black text-cyan-400 mt-1">{statisticsData.length}개</p>
          </div>
          <div className="text-2xl p-2 bg-blue-950/50 border border-blue-800/40 rounded-lg">📝</div>
        </div>

        <div className="bg-[#0b101d] border border-emerald-900/40 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400 font-medium">최고 정답률 문항</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">QUIZ #1 (92%)</p>
          </div>
          <div className="text-2xl p-2 bg-emerald-950/50 border border-emerald-800/40 rounded-lg">👑</div>
        </div>

        <div className="bg-[#0b101d] border border-rose-900/40 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400 font-medium">최저 정답률 문항</p>
            <p className="text-2xl font-black text-rose-400 mt-1">QUIZ #2 (30%)</p>
          </div>
          <div className="text-2xl p-2 bg-rose-950/50 border border-rose-800/40 rounded-lg">⚠️</div>
        </div>
      </div>

      {/* 3. 문항별 정답률 프로그레스 바 */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {statisticsData.map((item) => {
          const isHigh = item.percent >= 70;
          const isLow = item.percent < 40;
          const barColor = isHigh
            ? "from-cyan-500 to-blue-600 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
            : isLow
            ? "from-rose-600 to-red-500 shadow-[0_0_12px_rgba(225,29,72,0.4)]"
            : "from-amber-500 to-orange-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]";

          return (
            <div
              key={item.quizNo}
              className="bg-[#0b101d] border border-gray-800/90 rounded-xl p-4 flex flex-col gap-3"
            >
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-cyan-400 text-base">
                    QUIZ #{item.quizNo}
                  </span>
                  <span className="font-bold text-gray-200">{item.quizTitle}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded">
                    [{getTypeName(item.quizType)}]
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="text-gray-400">
                    정답자: <strong className="text-gray-200">{item.correctSubmissions}</strong> / {item.totalSubmissions}명
                  </span>
                  <span
                    className={`font-black text-sm w-12 text-right ${
                      isHigh ? "text-cyan-400" : isLow ? "text-rose-400" : "text-amber-400"
                    }`}
                  >
                    {item.percent}%
                  </span>
                </div>
              </div>

              <div className="w-full bg-[#050811] h-3.5 rounded-full overflow-hidden border border-gray-800 p-0.5 relative flex">
                <div
                  className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-700`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-gray-500 flex justify-between items-center pt-3 border-t border-gray-800/40 shrink-0">
        <span>💡 QUIZ_ANSWER 와 RESULT_ANSWER 비교 연산 집계 결과입니다.</span>
        <span>* 데이터 원본: RESULT 테이블</span>
      </div>
    </div>
  );
}