import React, { useState } from "react";
import BasicLayout from "../layouts/BasicLayout";

// 퀘스트 출석 보상 데이터
const INITIAL_REWARDS = [
  { day: 1, exp: 100, label: "일반 출석", icon: "📖", isClaimed: false },
  { day: 2, exp: 150, label: "연속 출석", icon: "✍️", isClaimed: false },
  { day: 3, exp: 200, label: "열공 부스터", icon: "🔥", isClaimed: false },
  { day: 4, exp: 250, label: "중간 달성", icon: "🛡️", isClaimed: false },
  { day: 5, exp: 300, label: "집중력 폭발", icon: "⚡", isClaimed: false },
  { day: 6, exp: 400, label: "스퍼트 완료", icon: "⚔️", isClaimed: false },
  { day: 7, exp: 1000, label: "주간 완주 보너스", icon: "👑", isClaimed: false },
];

const EventPage = () => {
  const [rewards, setRewards] = useState(INITIAL_REWARDS);

  // 출석 완료 개수 및 달성률 계산
  const claimedCount = rewards.filter((r) => r.isClaimed).length;
  const progressPercent = Math.round((claimedCount / rewards.length) * 100);

  // 카드 클릭 시 경험치 수령 처리
  const handleCardClick = (index) => {
    const targetReward = rewards[index];

    if (targetReward.isClaimed) {
      alert(`이미 ${targetReward.day}일차 보상을 획득하셨습니다!`);
      return;
    }

    if (index > 0 && !rewards[index - 1].isClaimed) {
      alert(`${index}일차 출석 퀘스트를 먼저 완료해야 합니다!`);
      return;
    }

    const updated = [...rewards];
    updated[index].isClaimed = true;
    setRewards(updated);

    alert(`🎉 [${targetReward.day}일차 출석 완료!] +${targetReward.exp} EXP를 획득했습니다.`);
  };

  return (
    <BasicLayout>
      {/* max-w-7xl로 폭을 넓히고 justify-around로 화면 전체에 시원하게 분산 */}
      <div className="flex-1 flex flex-col items-center justify-around py-8 px-6 max-w-7xl mx-auto w-full min-h-[calc(100vh-180px)]">
        
        {/* 1. 상단 퀘스트 타이틀 */}
        <div className="text-center my-2">
          <div className="inline-block bg-blue-900/40 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3 shadow-sm">
            ⚔️ QUEST LOG: DAILY CHECK-IN
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300 tracking-wider mb-3">
            출석 퀘스트 보상
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            카드를 클릭하여 일일 출석 퀘스트를 완료하고 EXP를 획득하세요!
          </p>
        </div>

        {/* 2. EXP 보상 카드 그리드 (카드 높이 h-64 확장 및 gap-5 조절) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5 w-full my-6">
          {rewards.map((item, index) => {
            const isCurrent = !item.isClaimed && (index === 0 || rewards[index - 1].isClaimed);

            return (
              <div
                key={item.day}
                onClick={() => handleCardClick(index)}
                className={`relative flex flex-col justify-between bg-slate-900/90 border rounded-2xl p-4 h-64 transition-all duration-300 overflow-hidden group cursor-pointer select-none ${
                  item.isClaimed
                    ? 'border-slate-800/60 opacity-60'
                    : isCurrent
                    ? 'border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.45)] ring-2 ring-blue-400 scale-[1.04] z-10 hover:scale-[1.07]'
                    : 'border-slate-800/90 opacity-40 hover:border-slate-700'
                }`}
              >
                {/* 상단 일차 배지 */}
                <div className={`absolute top-0 left-0 text-white text-xs font-bold px-2.5 py-1 rounded-br-xl shadow ${
                  item.day === 7 ? 'bg-amber-600' : 'bg-blue-600/80'
                }`}>
                  {item.day}일차
                </div>

                {/* 중앙 심볼 아이콘 & EXP 수치 */}
                <div className="flex-1 flex flex-col items-center justify-center relative mt-4">
                  <span className="text-4xl sm:text-5xl my-2 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>
                  
                  <div className="mt-2 text-center">
                    <span className={`text-lg font-black tracking-tight ${
                      item.day === 7 ? 'text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]' : 'text-blue-300'
                    }`}>
                      +{item.exp}
                    </span>
                    <span className="text-xs font-bold text-slate-400 ml-1">EXP</span>
                  </div>

                  {/* 출석 완료 도장 */}
                  {item.isClaimed && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="border-2 border-emerald-500/80 bg-slate-950/85 text-emerald-400 font-extrabold text-xs sm:text-sm px-3 py-1.5 rounded rotate-[-12deg] shadow-xl tracking-widest backdrop-blur-xs">
                        QUEST CLEAR
                      </div>
                    </div>
                  )}
                </div>

                {/* 하단 타이틀 라벨 */}
                <div className="border-t border-slate-800/80 pt-2.5 text-center">
                  <p className="text-xs sm:text-sm font-medium text-slate-300 truncate">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. 하단 주간 진행률 바 (폭 max-w-xl 확장) */}
        <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-lg my-2">
          <div className="flex justify-between text-xs sm:text-sm font-bold mb-3 px-1">
            <span className="text-slate-400">주간 출석 달성도</span>
            <span className="text-blue-400 font-mono">{claimedCount} / 7 일 ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-slate-950 h-4 rounded-full border border-slate-800/80 overflow-hidden relative">
            <div
              className="bg-gradient-to-r from-blue-600 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(52,211,153,0.6)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

      </div>
    </BasicLayout>
  );
};

export default EventPage;