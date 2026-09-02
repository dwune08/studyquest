import { useEffect, useState } from "react";
import jwtAxios from "../../api/jwtAxios";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";
import BasicLayout from "../../layouts/BasicLayout";

const StudentMyPage = () => {
  const [status, setStatus] = useState(null);
  const [topRankings, setTopRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");

  const { goLogin, goQuizList, goEvent } = useCustomNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setWarningMessage("");

      try {
        const res = await jwtAxios.get("/mypage/me");
        if (res.data) {
          setStatus(res.data.status);
          setTopRankings(res.data.topRankings || []);
        }
      } catch (error) {
        console.error("마이페이지 데이터 조회 실패:", error);
        setWarningMessage("데이터를 불러오는 데 실패했습니다. 기본 정보가 표시됩니다.");

        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
          const userInfo = JSON.parse(storedUserInfo);
          setStatus({
            studentName: userInfo.userName || userInfo.name || "모험가",
            studentEmail: userInfo.userEmail || userInfo.email || "-",
            studentGrade: userInfo.studentGrade || userInfo.grade || "-",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    goLogin();
  };

  const currentStatus = status || {
    studentName: "모험가",
    studentEmail: "이메일 정보 없음",
    studentGrade: "-",
    statusLevel: 1,
    statusExp: 0,
    nextLevelExp: 100,
    statusAttack: 0,
    statusWisdom: 0,
    statusSpeed: 0,
  };

  const expPercent =
    currentStatus.nextLevelExp > 0
      ? Math.min(
          (currentStatus.statusExp / currentStatus.nextLevelExp) * 100,
          100
        )
      : 0;

  const getRankBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `${rank}위`;
  };

  return (
    <BasicLayout>
      <div className="w-full max-w-5xl mx-auto px-4 py-4 text-white flex flex-col justify-start">
        
        {/* 이미지와 동일한 상단 헤더 문구 영역 */}
        <div className="mb-8 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-[11px] font-bold text-blue-300 tracking-wider mb-3 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            ⚔️ CHARACTER STATUS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
            모험가 프로필
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            현재 달성한 능력치와 학년 주간 랭킹을 확인하세요!
          </p>
        </div>

        {/* 에러/경고 안내 배너 */}
        {warningMessage && (
          <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center text-xs sm:text-sm text-amber-300">
            ⚠️ {warningMessage}
          </div>
        )}

        {/* 로딩 인디케이터 */}
        {loading && (
          <div className="mb-3 text-center text-xs text-blue-400">
            최신 데이터를 동기화 중입니다...
          </div>
        )}

        {/* 메인 프로필/스탯 카드 */}
        <div className="rounded-3xl border border-slate-800 bg-[#0f1a2e]/90 p-6 sm:p-8 shadow-[0_0_40px_rgba(37,99,235,0.12)] backdrop-blur-sm">
          
          <header className="flex flex-col gap-6 border-b border-slate-800 pb-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold tracking-wider text-blue-400">STUDENT PROFILE</p>
              <h2 className="mt-1 text-2xl font-black text-slate-100">
                Lv.{currentStatus.statusLevel} {currentStatus.studentName}
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                {currentStatus.studentEmail || "이메일 정보 없음"}
              </p>
            </div>

            <div className="flex-1 md:px-8">
              <div className="mb-2 flex justify-between text-xs font-bold">
                <span className="text-blue-400">EXP</span>
                <span className="text-slate-400">
                  {currentStatus.statusExp} / {currentStatus.nextLevelExp}
                </span>
              </div>

              <div className="h-3.5 overflow-hidden rounded-full bg-slate-950 border border-slate-800/80 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all duration-500"
                  style={{ width: `${expPercent}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-rose-500/50 hover:text-rose-400 active:scale-95 cursor-pointer"
            >
              로그아웃
            </button>
          </header>

          <main className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
            <section className="space-y-6">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-[#081225]/80 p-6 text-center h-full min-h-[220px]">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-5xl shadow-[0_0_25px_rgba(59,130,246,0.35)] ring-4 ring-blue-500/20">
                  👩
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-100">
                  {currentStatus.studentName}
                </h3>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  {currentStatus.studentGrade ? `${currentStatus.studentGrade}학년` : "-"}
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-[#081225]/80 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-blue-400">MY STATUS</p>
                    <h3 className="mt-0.5 text-xl font-extrabold text-slate-100">나의 능력치</h3>
                  </div>

                  <div className="rounded-xl border border-blue-500/30 bg-blue-950/50 px-3.5 py-1.5 text-xs font-bold text-blue-300">
                    Lv.{currentStatus.statusLevel}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-800 bg-[#0f1a2e] p-5 transition-all hover:border-blue-500/50 hover:scale-[1.02]">
                    <div className="text-2xl">⚔️</div>
                    <p className="mt-3 text-xs font-medium text-slate-400">공격력</p>
                    <p className="mt-0.5 text-2xl font-black text-blue-400">
                      {currentStatus.statusAttack}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">5지선다</p>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-[#0f1a2e] p-5 transition-all hover:border-purple-500/50 hover:scale-[1.02]">
                    <div className="text-2xl">🧠</div>
                    <p className="mt-3 text-xs font-medium text-slate-400">지혜</p>
                    <p className="mt-0.5 text-2xl font-black text-purple-400">
                      {currentStatus.statusWisdom}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">빈칸 채우기</p>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-[#0f1a2e] p-5 transition-all hover:border-cyan-500/50 hover:scale-[1.02]">
                    <div className="text-2xl">⚡</div>
                    <p className="mt-3 text-xs font-medium text-slate-400">스피드</p>
                    <p className="mt-0.5 text-2xl font-black text-cyan-400">
                      {currentStatus.statusSpeed}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">O / X 퀴즈</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-[#081225]/80 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <span>🏆</span> 학년 주간 랭킹
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500">TOP 5</span>
                </div>

                <div className="space-y-2.5">
                  {topRankings.length > 0 ? (
                    topRankings.map((rankItem) => (
                      <div
                        key={rankItem.studentNo || rankItem.rank}
                        className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-[#0f1a2e] px-4 py-3 transition hover:border-slate-700"
                      >
                        <span className="text-sm font-medium text-slate-200">
                          {getRankBadge(rankItem.rank)} {rankItem.studentName}
                        </span>
                        <span className="text-xs font-bold text-blue-400">
                          Lv.{rankItem.level}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-xs text-slate-500">
                      랭킹 정보를 불러오는 중이거나 데이터가 없습니다.
                    </div>
                  )}
                </div>
              </div>

            </section>
          </main>
        </div>
      </div>
    </BasicLayout>
  );
};

export default StudentMyPage;