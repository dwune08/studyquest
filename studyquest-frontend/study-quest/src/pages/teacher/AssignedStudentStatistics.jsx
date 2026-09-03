import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import jwtAxios from "../../api/jwtAxios"; // 프로젝트 구조에 맞는 경로 확인 필요

export default function AssignedStudentStatistics() {
  const [studentLogs, setStudentLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loginState = useSelector((state) => state.loginSlice);
  const teacherNo = loginState?.teacherNo; 
  
  // 1. 학생 퀴즈 제출 현황 조회 (API 연동)
  const fetchStudentLogs = async (isInit = false) => {
    // teacherNo가 없으면 요청을 중단
    if (!teacherNo) {
      setLoading(false);
      return;
    }

    try {
      if (!isInit) {
        setLoading(true);
      }
      
      const response = await jwtAxios.get(`http://localhost:8080/teachers/student-results?teacherNo=${teacherNo}`);

      const data = response.data;
      let extractedList = [];

      if (Array.isArray(data)) {
        extractedList = data;
      } else if (data && Array.isArray(data.content)) {
        extractedList = data.content;
      } else if (data && Array.isArray(data.list)) {
        extractedList = data.list;
      } else if (data && Array.isArray(data.data)) {
        extractedList = data.data;
      } else if (data && typeof data === "object") {
        const arrayField = Object.values(data).find((val) => Array.isArray(val));
        extractedList = arrayField || [];
      }

      setStudentLogs(extractedList);
    } catch (error) {
      console.error("학생 퀴즈 제출 현황을 불러오는 데 실패했습니다:", error);
      setStudentLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // teacherNo가 준비되었을 때만 데이터 조회 함수 호출
    if (teacherNo) {
      fetchStudentLogs(true);
    }
  }, [teacherNo]); // teacherNo 값이 바뀔 때(로그인 완료 시점 등) 재조회 가능

  // 2. 통계 지표 계산
  const totalSubmitted = studentLogs.length;
  const correctCount = studentLogs.filter((log) => log.isCorrect).length;
  const avgScore = totalSubmitted > 0 ? Math.round((correctCount / totalSubmitted) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* 요약 카운트 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#0b101d] border border-gray-800 p-5 rounded-xl text-center">
          <p className="text-xs text-cyan-400 font-bold mb-2">[ 📊 제출 응답 평균 정답률 ]</p>
          <p className="text-2xl font-black text-gray-100">
            정답률 : <span className="text-cyan-300">{avgScore}%</span>
          </p>
        </div>
        <div className="bg-[#0b101d] border border-gray-800 p-5 rounded-xl text-center">
          <p className="text-xs text-rose-400 font-bold mb-2">[ ✂️ QUIZ 제출 건수 ]</p>
          <p className="text-2xl font-black text-gray-100">
            총 응답 건수 : <span className="text-rose-300">{totalSubmitted}건</span>
          </p>
        </div>
      </div>

      {/* RESULT 결과 리스트 */}
      <div>
        <h3 className="text-center font-bold text-gray-300 border-b border-gray-800 pb-4 mb-6">
          ― 학생 퀴즈 제출 현황 (RESULT) ―
        </h3>

        <div className="space-y-3">
          {loading && (
            <div className="rounded-xl border border-gray-800 bg-[#0b101d] p-10 text-center text-sm text-gray-400">
              데이터를 불러오는 중입니다...
            </div>
          )}

          {!loading && (!Array.isArray(studentLogs) || studentLogs.length === 0) && (
            <div className="rounded-xl border border-gray-800 bg-[#0b101d] p-10 text-center text-sm text-gray-500">
              제출된 퀴즈 내역이 없습니다.
            </div>
          )}

          {!loading && Array.isArray(studentLogs) && studentLogs.map((log, idx) => (
            <div
              key={log.resultNo || idx}
              className="flex items-center justify-between bg-[#0b101d] border border-gray-800/80 px-6 py-4 rounded-xl text-sm"
            >
              <div className="flex items-center gap-3 w-32">
                <span className="text-xs text-gray-500 font-mono">#{log.studentNo || "N/A"}</span>
                <span className="font-bold text-white">{log.userName || "이름 없음"}</span>
              </div>
              <span className="text-gray-300 flex-1 text-center font-medium">{log.quizTitle || "제목 없음"}</span>
              <span className="text-gray-500 text-xs w-28 text-center">{log.resultDate || "-"}</span>
              <div className="w-28 text-center text-xs">
                <span className="text-gray-400">제출: </span>
                <span className="text-cyan-400 font-bold">{log.resultAnswer ?? "-"}</span>
                <span className="text-gray-500"> (정답: {log.quizAnswer ?? "-"})</span>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-full font-bold w-20 text-center border ${
                  log.isCorrect
                    ? "border-emerald-500/40 text-emerald-400 bg-emerald-950/30"
                    : "border-red-500/40 text-red-400 bg-red-950/30"
                }`}
              >
                {log.isCorrect ? "정답" : "오답"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}