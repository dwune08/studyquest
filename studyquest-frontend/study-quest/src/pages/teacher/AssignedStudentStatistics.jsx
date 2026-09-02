export default function AssignedStudentStatistics() {
  // RESULT + STUDENT + USER + QUIZ 테이블 조인 데이터 형태
  const studentLogs = [
    {
      resultNo: 101,
      studentNo: 1,
      userName: "김초딩",
      quizTitle: "2차 방정식과 이차함수",
      resultDate: "2026-08-30",
      resultAnswer: "3",
      quizAnswer: "3", // QUIZ.QUIZ_ANSWER와 비교하여 정답 여부 판별
      isCorrect: true,
    },
    {
      resultNo: 102,
      studentNo: 2,
      userName: "이영희",
      quizTitle: "2차 방정식과 이차함수",
      resultDate: "2026-08-30",
      resultAnswer: "3",
      quizAnswer: "3",
      isCorrect: true,
    },
    {
      resultNo: 103,
      studentNo: 3,
      userName: "박민수",
      quizTitle: "2차 방정식과 이차함수",
      resultDate: "2026-08-29",
      resultAnswer: "1",
      quizAnswer: "3",
      isCorrect: false,
    },
  ];

  const totalSubmitted = studentLogs.length;
  const correctCount = studentLogs.filter((log) => log.isCorrect).length;
  const avgScore = Math.round((correctCount / totalSubmitted) * 100);

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
          {studentLogs.map((log) => (
            <div
              key={log.resultNo}
              className="flex items-center justify-between bg-[#0b101d] border border-gray-800/80 px-6 py-4 rounded-xl text-sm"
            >
              <div className="flex items-center gap-3 w-32">
                <span className="text-xs text-gray-500 font-mono">#{log.studentNo}</span>
                <span className="font-bold text-white">{log.userName}</span>
              </div>
              <span className="text-gray-300 flex-1 text-center font-medium">{log.quizTitle}</span>
              <span className="text-gray-500 text-xs w-28 text-center">{log.resultDate}</span>
              <div className="w-28 text-center text-xs">
                <span className="text-gray-400">제출: </span>
                <span className="text-cyan-400 font-bold">{log.resultAnswer}</span>
                <span className="text-gray-500"> (정답: {log.quizAnswer})</span>
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