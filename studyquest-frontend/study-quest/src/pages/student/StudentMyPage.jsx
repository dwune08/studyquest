import { useEffect, useState } from "react";
import { getStudent } from "../../api/studentApi";
import { getStatus } from "../../api/statusApi";
import { useNavigate, useParams } from "react-router-dom";

const StudentMyPage = () => {
  const [student, setStudent] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { no } = useParams();
  const studentNo = Number(no);

  useEffect(() => {
    const loadData = async () => {
      try {
        const studentData = await getStudent(studentNo);
        const statusData = await getStatus(studentNo);

        setStudent(studentData);
        setStatus(statusData);
      } catch (err) {
        console.error("마이페이지 데이터 조회 오류", err);

        setError(
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message
        );
      }
    };

    loadData();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <div className="rounded-2xl border border-slate-700 bg-[#0f1a2e] p-8 text-center shadow-2xl">
          <p className="font-bold text-red-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!student || !status) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] text-slate-300">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  const expPercent =
    status.nextLevelExp > 0
      ? Math.min(
          (status.statusExp / status.nextLevelExp) * 100,
          100
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-10 text-white">

      {/* 로고 */}
      <div className="mb-10 flex justify-center">
        <h1 className="text-4xl font-black tracking-[0.2em] text-slate-100">
          🗡️ STUDY:QUEST
        </h1>
      </div>

      {/* 전체 카드 */}
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-700 bg-[#0f1a2e] p-8 shadow-[0_0_40px_rgba(37,99,235,0.12)]">

        {/* 상단 정보 */}
        <header className="flex flex-col gap-6 border-b border-slate-700 pb-8 md:flex-row md:items-center">

          <div>
            <p className="text-sm text-slate-400">
              STUDENT
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Lv.{status.statusLevel} {student.studentName}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {student.studentEmail}
            </p>
          </div>

          {/* EXP */}
          <div className="flex-1 md:px-8">

            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold text-blue-400">
                EXP
              </span>

              <span className="text-slate-400">
                {status.statusExp} / {status.nextLevelExp}
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
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
          >
            로그아웃
          </button>

        </header>

        {/* 메인 콘텐츠 */}
        <main className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">

          {/* 왼쪽 */}
          <section className="space-y-6">

            {/* 프로필 */}
            <div className="rounded-2xl border border-slate-700 bg-[#081225] p-6 text-center">

              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-6xl shadow-[0_0_25px_rgba(59,130,246,0.35)]">
                👩
              </div>

              <h3 className="mt-5 text-xl font-bold">
                {student.studentName}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {student.studentGrade}학년
              </p>

            </div>

            {/* 출석 */}
            <div className="rounded-2xl border border-slate-700 bg-[#081225] p-6">

              <h3 className="text-lg font-bold">
                📅 출석 현황
              </h3>

              <div className="mt-5 grid grid-cols-5 gap-2 text-center text-sm">

                {["월", "화", "수", "목", "금"].map((day) => (
                  <div
                    key={day}
                    className="rounded-lg border border-slate-700 bg-[#0f1a2e] py-3 text-slate-300"
                  >
                    {day}
                  </div>
                ))}

              </div>

            </div>

          </section>

          {/* 오른쪽 */}
          <section className="space-y-8">

            {/* 스탯 카드 */}
            <div className="rounded-2xl border border-slate-700 bg-[#081225] p-8">

              <div className="mb-8 flex items-center justify-between">

                <div>
                  <p className="text-sm text-blue-400">
                    MY STATUS
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    나의 게임 스탯
                  </h3>
                </div>

                <div className="rounded-xl bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                  Lv.{status.statusLevel}
                </div>

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                {/* 공격력 */}
                <div className="rounded-2xl border border-slate-700 bg-[#0f1a2e] p-6 transition hover:border-blue-500">

                  <div className="text-3xl">
                    ⚔
                  </div>

                  <p className="mt-4 text-sm text-slate-400">
                    공격력
                  </p>

                  <p className="mt-1 text-3xl font-bold text-blue-400">
                    {status.statusAttack}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    5지선다
                  </p>

                </div>

                {/* 지혜 */}
                <div className="rounded-2xl border border-slate-700 bg-[#0f1a2e] p-6 transition hover:border-violet-500">

                  <div className="text-3xl">
                    🧠
                  </div>

                  <p className="mt-4 text-sm text-slate-400">
                    지혜
                  </p>

                  <p className="mt-1 text-3xl font-bold text-violet-400">
                    {status.statusWisdom}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    빈칸
                  </p>

                </div>

                {/* 스피드 */}
                <div className="rounded-2xl border border-slate-700 bg-[#0f1a2e] p-6 transition hover:border-cyan-500">

                  <div className="text-3xl">
                    ⚡
                  </div>

                  <p className="mt-4 text-sm text-slate-400">
                    스피드
                  </p>

                  <p className="mt-1 text-3xl font-bold text-cyan-400">
                    {status.statusSpeed}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    O / X
                  </p>

                </div>

              </div>

            </div>

            {/* 랭킹 */}
            <div className="rounded-2xl border border-slate-700 bg-[#081225] p-8">

              <div className="mb-5 flex items-center justify-between">

                <h3 className="text-xl font-bold">
                  🏆 학급 주간 랭킹
                </h3>

                <span className="text-xs text-slate-500">
                  이번 주
                </span>

              </div>

              <div className="space-y-3">

                <div className="flex items-center justify-between rounded-xl bg-[#0f1a2e] px-5 py-4">
                  <span>
                    🥇 이영희
                  </span>

                  <span className="text-blue-400">
                    Lv.15
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-[#0f1a2e] px-5 py-4">
                  <span>
                    🥈 김철수
                  </span>

                  <span className="text-slate-400">
                    Lv.12
                  </span>
                </div>

              </div>

            </div>

          </section>

        </main>

        {/* 하단 버튼 */}
        <footer className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">

          <button
            type="button"
            className="rounded-xl border border-slate-700 bg-[#081225] py-4 font-bold text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
          >
            📅 출석체크하기
          </button>

          <button
            type="button" onClick={() => navigate("/quizzes")}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition hover:brightness-110"
          >
            ⚔ 퀴즈 던전 입장
          </button>

        </footer>

      </div>

    </div>
  );
};

export default StudentMyPage;