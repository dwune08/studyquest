import { useEffect, useState } from "react";
import jwtAxios from "../api/jwtAxios";
import BasicLayout from "../layouts/BasicLayout";
import { useAuth } from "../hooks/useAuth";
import { useAuthGuard } from "../hooks/useAuthGuard";

const BASE_REWARDS = [
  { day: 1, exp: 10, label: "모험의 시작", icon: "📖" },
  { day: 2, exp: 10, label: "탐험가 습관", icon: "✍️" },
  { day: 3, exp: 10, label: "열정의 불꽃", icon: "🔥" },
  { day: 4, exp: 10, label: "강철의 의지", icon: "🛡️" },
  { day: 5, exp: 10, label: "한계 돌파", icon: "⚡" },
  { day: 6, exp: 10, label: "전사의 결의", icon: "⚔️" },
  { day: 7, exp: 50, label: "전설의 완주자", icon: "👑" },
];

const EventPage = () => {
  // 1. 비로그인 사용자 접근 제한 (자동 리다이렉트)
  useAuthGuard();

  // 2. 통합 인증 Hook에서 studentNo 추출 (Redux/LocalStorage/Cookie 자동 병합)
  const { studentNo } = useAuth();

  const [attendanceInfo, setAttendanceInfo] = useState({
    attendanceDays: 0,
    attendanceWeeklyCount: 0,
    checkedToday: false,
  });
  const [loading, setLoading] = useState(true);

  // 출석 정보 조회
  useEffect(() => {
    const fetchAttendance = async () => {
      if (!studentNo) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await jwtAxios.get(`/event?studentNo=${studentNo}`);
        if (res.data) {
          setAttendanceInfo(res.data);
        }
      } catch (error) {
        console.error("출석 정보 로딩 실패:", error);
        // 401 에러 처리는 jwtAxios 인터셉터에서 재발급/리다이렉트를 전역으로 담당합니다.
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [studentNo]);

  // 보상 상태 계산
  const rewards = BASE_REWARDS.map((item) => ({
    ...item,
    isClaimed:
      item.day < attendanceInfo.attendanceWeeklyCount ||
      (item.day === attendanceInfo.attendanceWeeklyCount && attendanceInfo.checkedToday),
  }));

  const claimedCount = rewards.filter((r) => r.isClaimed).length;
  const progressPercent = Math.round((claimedCount / 7) * 100);

  // 출석 체크 처리
  const handleCheckIn = async (index) => {
    if (!studentNo) {
      alert("학생 정보를 확인할 수 없습니다. 다시 로그인해 주세요.");
      return;
    }

    const targetDay = index + 1;

    if (attendanceInfo.checkedToday) {
      alert("오늘은 이미 출석 체크를 완료하셨습니다! 내일 다시 참여해 주세요.");
      return;
    }

    const nextTargetDay = attendanceInfo.attendanceWeeklyCount + 1;
    if (targetDay !== nextTargetDay && !(attendanceInfo.attendanceWeeklyCount === 0 && targetDay === 1)) {
      alert(`${nextTargetDay > 7 ? 1 : nextTargetDay}일차 출석 순서입니다.`);
      return;
    }

    try {
      const res = await jwtAxios.post(`/event?studentNo=${studentNo}`);
      if (res.data) {
        const data = res.data;
        alert(`🎉 [${data.attendanceWeeklyCount}일차 출석 완료!] +${data.rewardExp} EXP를 획득했습니다.`);

        setAttendanceInfo({
          attendanceDays: data.attendanceDays,
          attendanceWeeklyCount: data.attendanceWeeklyCount,
          checkedToday: true,
        });
      }
    } catch (error) {
      console.error("출석 체크 실패:", error);
      // 401 토큰 만료는 jwtAxios가 자동으로 처리하며, 그 외 비즈니스 에러 메시지만 표시
      if (error.response?.status !== 401) {
        alert(error.response?.data?.message || "출석 체크 처리 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <BasicLayout>
      <div className="flex-1 flex flex-col items-center justify-around py-8 px-6 max-w-7xl mx-auto w-full min-h-[calc(100vh-180px)]">
        {loading && (
          <div className="text-sm text-blue-400 font-semibold animate-pulse">
            출석 정보 데이터를 불러오는 중입니다...
          </div>
        )}

        <div className="text-center my-2">
          <div className="inline-block bg-blue-900/40 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3 shadow-sm">
            ⚔️ QUEST LOG: DAILY CHECK-IN
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300 tracking-wider mb-3">
            출석 퀘스트 보상
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {attendanceInfo.checkedToday
              ? "오늘의 출석 퀘스트를 이미 완료하셨습니다! 내일 또 들러주세요."
              : "오늘의 카드를 클릭하여 일일 출석 퀘스트를 완료하고 EXP를 획득하세요!"}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5 w-full my-6">
          {rewards.map((item, index) => {
            const nextDay = attendanceInfo.attendanceWeeklyCount + 1 > 7 ? 1 : attendanceInfo.attendanceWeeklyCount + 1;
            const isCurrent = !attendanceInfo.checkedToday && item.day === nextDay;

            return (
              <div
                key={item.day}
                onClick={() => handleCheckIn(index)}
                className={`relative flex flex-col justify-between bg-slate-900/90 border rounded-2xl p-4 h-64 transition-all duration-300 overflow-hidden group cursor-pointer select-none ${
                  item.isClaimed
                    ? "border-slate-800/60 opacity-60"
                    : isCurrent
                    ? "border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.45)] ring-2 ring-blue-400 scale-[1.04] z-10 hover:scale-[1.07]"
                    : "border-slate-800/90 opacity-40 hover:border-slate-700"
                }`}
              >
                <div
                  className={`absolute top-0 left-0 text-white text-xs font-bold px-2.5 py-1 rounded-br-xl shadow ${
                    item.day === 7 ? "bg-amber-600" : "bg-blue-600/80"
                  }`}
                >
                  {item.day}일차
                </div>

                <div className="flex-1 flex flex-col items-center justify-center relative mt-4">
                  <span className="text-4xl sm:text-5xl my-2 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </span>

                  <div className="mt-2 text-center">
                    <span
                      className={`text-lg font-black tracking-tight ${
                        item.day === 7 ? "text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" : "text-blue-300"
                      }`}
                    >
                      +{item.exp}
                    </span>
                    <span className="text-xs font-bold text-slate-400 ml-1">EXP</span>
                  </div>

                  {item.isClaimed && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="border-2 border-emerald-500/80 bg-slate-950/85 text-emerald-400 font-extrabold text-xs sm:text-sm px-3 py-1.5 rounded rotate-[-12deg] shadow-xl tracking-widest backdrop-blur-xs">
                        QUEST CLEAR
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-800/80 pt-2.5 text-center">
                  <p className="text-xs sm:text-sm font-medium text-slate-300 truncate">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-lg my-2">
          <div className="flex justify-between text-xs sm:text-sm font-bold mb-3 px-1">
            <span className="text-slate-400">
              주간 출석 달성도 (총 누적: {attendanceInfo.attendanceDays}일)
            </span>
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