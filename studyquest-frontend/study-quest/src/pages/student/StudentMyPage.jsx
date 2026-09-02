import { useEffect, useState } from "react";
import jwtAxios from "../../api/jwtAxios"; // 프로젝트 구조에 맞게 경로 확인
import { useCustomNavigate } from "../../hooks/useCustomNavigate";

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
        // 백엔드의 GET /mypage/me (JWT 토큰 기반 로그인 사용자 본인 조회 API) 호출
        const res = await jwtAxios.get("/mypage/me");

        // res.data -> StudentMyPageDTO { status: StatusDTO, topRankings: List<RankDTO> }
        if (res.data) {
          setStatus(res.data.status);
          setTopRankings(res.data.topRankings || []);
        }
      } catch (error) {
        console.error("마이페이지 데이터 조회 실패:", error);
        setWarningMessage("데이터를 불러오는 데 실패했습니다. 기본 정보가 표시됩니다.");

        // API 실패 시 localStorage의 기본 사용자 정보로 Fallback 세팅
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

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.clear();
    goLogin();
  };

  // Safe Navigation용 기본값 (statusDTO 필드 기준)
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

  // 랭킹 등수 이모지 변환 함수
  const getRankBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `${rank}위`;
  };

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-10 text-white">
      {/* 로고 */}
      <div className="mb-6 flex justify-center">
        <h1 className="text-4xl font-black tracking-[0.2em] text-slate-100">
          🗡️ STUDY:QUEST
        </h1>
      </div>

      {/* 에러/경고 안내 배너 */}
      {warningMessage && (
        <div className="mx-auto mb-6 max-w-6xl rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-center text-sm text-amber-300">
          ⚠️ {warningMessage}
        </div>
      )}

      {/* 로딩 인디케이터 */}
      {loading && (
        <div className="mx-auto mb-4 max-w-6xl text-center text-xs text-blue-400">
          최신 데이터를 동기화 중입니다...
        </div>
      )}

      {/* 전체 카드 */}
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-700 bg-[#0f1a2e] p-8 shadow-[0_0_40px_rgba(37,99,235,0.12)]">
        {/* 상단 헤더 */}
        <header className="flex flex-col gap-6 border-b border-slate-700 pb-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-slate-400">STUDENT</p>
            <h2 className="mt-1 text-2xl font-bold">
              Lv.{currentStatus.statusLevel} {currentStatus.studentName}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {currentStatus.studentEmail || "이메일 정보 없음"}
            </p>
          </div>

          {/* EXP 게이지 */}
          <div className="flex-1 md:px-8">
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold text-blue-400">EXP</span>
              <span className="text-slate-400">
                {currentStatus.statusExp} / {currentStatus.nextLevelExp}
              </span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-[#081225]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600 shadow-[0_0_14px_rgba(59,130,246,0.7)] transition-all duration-500"
                style={{
                  width: `${expPercent}%`,
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:border-red-500 hover:text-red-400 cursor-pointer"
          >
            로그아웃
          </button>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
          {/* 왼쪽: 프로필 영역 */}
          <section className="space-y-6">
            <div className="rounded-2xl border border-slate-700 bg-[#081225] p-6 text-center">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-6xl shadow-[0_0_25px_rgba(59,130,246,0.35)]">
                👩
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {currentStatus.studentName}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {currentStatus.studentGrade ? `${currentStatus.studentGrade}학년` : "-"}
              </p>
            </div>
          </section>

          {/* 오른쪽: 스탯 및 랭킹 영역 */}
          <section className="space-y-8">
            {/* 스탯 카드 */}
            <div className="rounded-2xl border border-slate-700 bg-[#081225] p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-400">MY STATUS</p>
                  <h3 className="mt-1 text-2xl font-bold">나의 게임 스탯</h3>
                </div>

                <div className="rounded-xl bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                  Lv.{currentStatus.statusLevel}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {/* 공격력 */}
                <div className="rounded-2xl border border-slate-700 bg-[#0f1a2e] p-6 transition hover:border-blue-500">
                  <div className="text-3xl">⚔</div>
                  <p className="mt-4 text-sm text-slate-400">공격력</p>
                  <p className="mt-1 text-3xl font-bold text-blue-400">
                    {currentStatus.statusAttack}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">5지선다</p>
                </div>

                {/* 지혜 */}
                <div className="rounded-2xl border border-slate-700 bg-[#0f1a2e] p-6 transition hover:border-violet-500">
                  <div className="text-3xl">🧠</div>
                  <p className="mt-4 text-sm text-slate-400">지혜</p>
                  <p className="mt-1 text-3xl font-bold text-violet-400">
                    {currentStatus.statusWisdom}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">빈칸</p>
                </div>

                {/* 스피드 */}
                <div className="rounded-2xl border border-slate-700 bg-[#0f1a2e] p-6 transition hover:border-cyan-500">
                  <div className="text-3xl">⚡</div>
                  <p className="mt-4 text-sm text-slate-400">스피드</p>
                  <p className="mt-1 text-3xl font-bold text-cyan-400">
                    {currentStatus.statusSpeed}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">O / X</p>
                </div>
              </div>
            </div>

            {/* 주간 랭킹 (동적 랜더링) */}
            <div className="rounded-2xl border border-slate-700 bg-[#081225] p-8">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold">🏆 학년 주간 랭킹</h3>
                <span className="text-xs text-slate-500">TOP 5</span>
              </div>

              <div className="space-y-3">
                {topRankings.length > 0 ? (
                  topRankings.map((rankItem) => (
                    <div
                      key={rankItem.studentNo || rankItem.rank}
                      className="flex items-center justify-between rounded-xl bg-[#0f1a2e] px-5 py-4"
                    >
                      <span className="font-medium">
                        {getRankBadge(rankItem.rank)} {rankItem.studentName}
                      </span>
                      <span className="font-semibold text-blue-400">
                        Lv.{rankItem.level}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-sm text-slate-500">
                    랭킹 정보를 불러오는 중이거나 데이터가 없습니다.
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* 하단 버튼 영역 */}
        <footer className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={goEvent}
            className="rounded-xl border border-slate-700 bg-[#081225] py-4 font-bold text-slate-300 transition hover:border-blue-500 hover:text-blue-400 cursor-pointer"
          >
            📅 출석체크 하러가기
          </button>

          <button
            type="button"
            onClick={goQuizList}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition hover:brightness-110 cursor-pointer"
          >
            ⚔ 퀴즈 던전 입장
          </button>
        </footer>
      </div>
    </div>
  );
};

export default StudentMyPage;