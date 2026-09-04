import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jwtAxios from "../../api/jwtAxios";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";
import BasicLayout from "../../layouts/BasicLayout";
import { getStudentLevelImage } from "../../utils/studentLevelImage";

const StudentMyPage = () => {
  const [status, setStatus] = useState(null);
  const [topRankings, setTopRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warningMessage, setWarningMessage] = useState("");

  const { goLogin, goModify, goRank } = useCustomNavigate();
  const loginUser = useSelector((state) => state.loginSlice);

  const handleEditClick = () => {
    const currentUserNo = loginUser?.userNo || status?.userNo;

    if (currentUserNo) {
      goModify(currentUserNo);
    } else {
      alert("회원 정보를 확인할 수 없습니다. 다시 로그인해 주세요.");
    }
  };

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

  const currentStatus = {
    studentName: status?.studentName || "모험가",
    studentEmail: status?.studentEmail || "이메일 정보 없음",
    studentGrade: status?.studentGrade || "-",
    statusLevel: status?.statusLevel ?? 1,
    statusExp: status?.statusExp ?? 0,
    nextLevelExp: status?.nextLevelExp ?? 100,
    statusAttack: status?.statusAttack ?? 0,
    statusWisdom: status?.statusWisdom ?? 0,
    statusSpeed: status?.statusSpeed ?? 0,
    userNo: status?.userNo,
  };

  const currentLevel = currentStatus.statusLevel;
  const profileImage = getStudentLevelImage(currentLevel);

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

  const topMenuUserInfo = {
    role: "student",
    userType: 1,
    userName: currentStatus.studentName,
    userLevel: currentStatus.statusLevel,
    currentExp: currentStatus.statusExp,
    maxExp: currentStatus.nextLevelExp,
  };

  return (
    <BasicLayout userType="student" userInfo={topMenuUserInfo} onLogout={handleLogout}>
      <div className="w-full max-w-5xl mx-auto px-4 py-2 sm:py-6 text-white flex flex-col justify-center min-h-[calc(100vh-120px)]">
        {warningMessage && (
          <div className="mb-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center text-xs sm:text-sm text-amber-300">
            ⚠️ {warningMessage}
          </div>
        )}

        {loading && (
          <div className="mb-2 text-center text-xs text-blue-400">
            최신 데이터를 동기화 중입니다...
          </div>
        )}

        <div className="rounded-2xl border border-slate-800 bg-[#0f1a2e]/90 p-5 sm:p-7 shadow-[0_0_35px_rgba(37,99,235,0.1)] backdrop-blur-sm">
          {/* 헤더 영역 */}
          <header className="flex flex-col gap-4 border-b border-slate-800/80 pb-5 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold tracking-wider text-blue-400">STUDENT PROFILE</p>
              <h2 className="mt-0.5 text-2xl font-black text-slate-100">
                Lv.{currentStatus.statusLevel} {currentStatus.studentName}
              </h2>
            </div>

            <div className="flex-1 md:px-6">
              <div className="mb-1.5 flex justify-between text-xs font-bold">
                <span className="text-blue-400">EXP</span>
                <span className="text-slate-400">
                  {currentStatus.statusExp} / {currentStatus.nextLevelExp}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-950 border border-slate-800/80 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-all duration-500"
                  style={{
                    width: `${expPercent}%`,
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-rose-500/50 hover:text-rose-400 active:scale-95 cursor-pointer self-start md:self-center"
            >
              로그아웃
            </button>
          </header>

          {/* 메인 2열 레이아웃 */}
          <main className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[240px_1fr] items-start">
            
            {/* 프로필 카드 */}
            <section className="flex flex-col items-center rounded-xl border border-slate-800 bg-[#081225]/80 p-5 text-center">
              <div className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-2xl border-2 border-blue-500/40 bg-[#071023] shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                <img
                  src={profileImage}
                  alt={`레벨 ${currentLevel} 학생 프로필`}
                  className="h-full w-full object-contain p-1"
                />
                <div className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-bold text-white">
                  Lv. {currentLevel}
                </div>
              </div>

              <h3 className="mt-3 text-lg font-bold text-slate-100">
                {currentStatus.studentName}
              </h3>

              <p className="mt-0.5 text-xs font-medium text-slate-400">
                {currentStatus.studentGrade ? `${currentStatus.studentGrade}학년` : "-"}
              </p>

              <button
                type="button"
                onClick={handleEditClick}
                className="w-full mt-4 py-2.5 px-4 rounded-xl border border-blue-500/30 bg-blue-950/60 hover:bg-blue-900/70 text-blue-300 hover:text-blue-100 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 shadow-[0_0_12px_rgba(59,130,246,0.15)] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>⚙️</span> 정보 수정
              </button>
            </section>

            {/* 능력치 & 랭킹 영역 */}
            <section className="space-y-4">
              <div className="rounded-xl border border-slate-800 bg-[#081225]/80 p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-blue-400">MY STATUS</p>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-100">나의 능력치</h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="rounded-xl border border-slate-800/80 bg-[#0f1a2e] p-3 sm:p-4 transition-all hover:border-blue-500/50">
                    <div className="text-xl sm:text-2xl">⚔️</div>
                    <p className="mt-1 text-xs font-medium text-slate-400">공격력</p>
                    <p className="mt-0.5 text-xl sm:text-2xl font-black text-blue-400">
                      {currentStatus.statusAttack}
                    </p>
                    <p className="mt-1 text-[10px] sm:text-[11px] text-slate-500">5지선다 퀴즈</p>
                  </div>

                  <div className="rounded-xl border border-slate-800/80 bg-[#0f1a2e] p-3 sm:p-4 transition-all hover:border-purple-500/50">
                    <div className="text-xl sm:text-2xl">🧠</div>
                    <p className="mt-1 text-xs font-medium text-slate-400">지혜</p>
                    <p className="mt-0.5 text-xl sm:text-2xl font-black text-purple-400">
                      {currentStatus.statusWisdom}
                    </p>
                    <p className="mt-1 text-[10px] sm:text-[11px] text-slate-500">단답형 퀴즈</p>
                  </div>

                  <div className="rounded-xl border border-slate-800/80 bg-[#0f1a2e] p-3 sm:p-4 transition-all hover:border-cyan-500/50">
                    <div className="text-xl sm:text-2xl">⚡</div>
                    <p className="mt-1 text-xs font-medium text-slate-400">스피드</p>
                    <p className="mt-0.5 text-xl sm:text-2xl font-black text-cyan-400">
                      {currentStatus.statusSpeed}
                    </p>
                    <p className="mt-1 text-[10px] sm:text-[11px] text-slate-500">O / X 퀴즈</p>
                  </div>
                </div>
              </div>

              {/* 주간 랭킹 */}
              <div
                onClick={goRank}
                className="group rounded-xl border border-slate-800 bg-[#081225]/80 p-4 sm:p-5 cursor-pointer transition-all duration-200 hover:border-blue-500/50 hover:bg-[#0c182e] active:scale-[0.99]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 group-hover:text-blue-300 transition-colors">
                    <span>🏆</span> 학년 주간 랭킹
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-400 transition-colors">TOP 5</span>
                    <span className="text-xs text-slate-600 group-hover:text-blue-400 transition-colors">➔</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {topRankings.length > 0 ? (
                    topRankings.map((rankItem) => (
                      <div
                        key={rankItem.studentNo || rankItem.rank}
                        className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-[#0f1a2e] px-3.5 py-2 transition hover:border-slate-700"
                      >
                        <span className="text-xs sm:text-sm font-medium text-slate-200">
                          {getRankBadge(rankItem.rank)} {rankItem.studentName}
                        </span>
                        <span className="text-xs font-bold text-blue-400">
                          Lv.{rankItem.level}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="py-3 text-center text-xs text-slate-500">
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