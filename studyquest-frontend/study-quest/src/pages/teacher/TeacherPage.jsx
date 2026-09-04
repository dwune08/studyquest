import { useState } from "react";
import { useLocation } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout"; // 프로젝트 구조에 맞춰 경로 확인
import AssignedStudentStatistics from "./AssignedStudentStatistics";
import ItemManagement from "./ItemManagement";
import ScoreStatistics from "./ScoreStatistics";

export default function TeacherPage() {
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState(
    location.state?.activeMenu ?? "students"
  );

  // 헤더에 들어갈 선생님 정보 설정
  const teacherInfo = {
    role: "teacher",
    userName: "선생님",
    userType: 2, // 💡 선생님 구분값
  };

  return (
    <BasicLayout userInfo={teacherInfo} userType={2}>
      {/* 중앙 메인 컨테이너 (좌측 메뉴 + 우측 콘텐츠) */}
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-8 flex flex-col md:flex-row gap-6 h-full items-stretch">
        
        {/* [좌측 메뉴 패널] */}
        <aside className="w-full md:w-64 bg-[#0f172a] border border-blue-900/30 rounded-2xl p-6 shadow-xl flex flex-col gap-6 shrink-0">
          <div className="text-xs font-bold text-gray-400 border-b border-gray-800 pb-3">
            [ 메뉴 ]
          </div>
          <nav className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setActiveMenu("students")}
              className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeMenu === "students"
                  ? "bg-[#1e293b] text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                  : "text-gray-400 hover:bg-[#162032] hover:text-gray-200"
              }`}
            >
              <span>•</span> 학생 관리
            </button>
            <button
              type="button"
              onClick={() => setActiveMenu("quizzes")}
              className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeMenu === "quizzes"
                  ? "bg-[#1e293b] text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                  : "text-gray-400 hover:bg-[#162032] hover:text-gray-200"
              }`}
            >
              <span>•</span> 퀴즈 관리
            </button>
            <button
              type="button"
              onClick={() => setActiveMenu("stats")}
              className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
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
        <section className="flex-1 bg-[#0f172a] border border-blue-900/30 rounded-2xl p-6 sm:p-8 shadow-xl relative min-h-[500px] overflow-y-auto">
          {activeMenu === "students" && <AssignedStudentStatistics />}
          {activeMenu === "quizzes" && <ItemManagement />}
          {activeMenu === "stats" && <ScoreStatistics />}
        </section>
      </div>
    </BasicLayout>
  );
}