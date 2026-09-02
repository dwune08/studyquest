import { useState } from "react";
import AssignedStudentStatistics from "./AssignedStudentStatistics";
import ItemManagement from "./ItemManagement";
import ScoreStatistics from "./ScoreStatistics";

export default function TeacherPage() {
  const [activeMenu, setActiveMenu] = useState("students");

  return (
    <div className="min-h-screen bg-[#070a12] text-white flex flex-col justify-between font-sans">
      {/* 1. 최상단 헤더 바 */}
      <header className="h-14 bg-[#0d1322] border-b border-gray-800/80 px-8 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span className="text-xl">🗡️</span>
          <span className="font-extrabold text-base tracking-wider">STUDY:QUEST</span>
          <span className="px-2 py-0.5 bg-blue-950/80 border border-blue-500/40 rounded text-xs text-blue-400 font-bold ml-2">
            ADMIN
          </span>
        </div>

        <div className="text-gray-300 font-medium text-xs">
          3학년 담당 [선생님]
        </div>

        <button className="px-3 py-1 bg-[#161f33] border border-gray-700/60 hover:border-gray-500 rounded text-xs text-gray-300 transition-all">
          로그아웃
        </button>
      </header>

      {/* 2. 중앙 메인 컨테이너 (좌측 메뉴 + 우측 콘텐츠) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 flex gap-6">
        {/* [좌측 메뉴 패널] */}
        <aside className="w-64 bg-[#0f172a] border border-blue-900/30 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
          <div className="text-xs font-bold text-gray-400 border-b border-gray-800 pb-3">
            [ 메뉴 ]
          </div>
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => setActiveMenu("students")}
              className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeMenu === "students"
                  ? "bg-[#1e293b] text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                  : "text-gray-400 hover:bg-[#162032] hover:text-gray-200"
              }`}
            >
              <span>•</span> 학생 성적
            </button>
            <button
              onClick={() => setActiveMenu("quizzes")}
              className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeMenu === "quizzes"
                  ? "bg-[#1e293b] text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                  : "text-gray-400 hover:bg-[#162032] hover:text-gray-200"
              }`}
            >
              <span>•</span> 퀴즈 관리
            </button>
            <button
              onClick={() => setActiveMenu("stats")}
              className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeMenu === "stats"
                  ? "bg-[#1e293b] text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                  : "text-gray-400 hover:bg-[#162032] hover:text-gray-200"
              }`}
            >
              <span>•</span> 성적 통계
            </button>
          </nav>
        </aside>

        {/* [우측 메인 콘텐츠 패널] */}
        <section className="flex-1 bg-[#0f172a] border border-blue-900/30 rounded-2xl p-8 shadow-xl relative min-h-[500px]">
          {activeMenu === "students" && <AssignedStudentStatistics />}
          {activeMenu === "quizzes" && <ItemManagement />}
          {activeMenu === "stats" && <ScoreStatistics />}
        </section>
      </main>

      {/* 3. 하단 액션 바 */}
      <footer className="py-4 px-12 bg-[#070a12] border-t border-gray-900 flex justify-end">
        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all">
          ⚔️ 퀴즈 던전 입장
        </button>
      </footer>
    </div>
  );
}