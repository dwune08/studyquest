export default function ItemManagement() {
  // QUIZ + CHOICES 테이블 기반 데이터
  const quizzes = [
    {
      quizNo: 1,
      teacherNo: 10,
      quizType: 1, // 1: 객관식, 2: OX, 3: 단답형
      quizTitle: "2차 방정식의 해 구하기",
      quizQuestion: "다음 중 x^2 - 4 = 0 의 해로 올바른 것은?",
      quizAnswer: "2",
      choices: {
        choices1: "x = 1",
        choices2: "x = ±2",
        choices3: "x = 3",
        choices4: "x = 4",
        choices5: "해 없음",
      },
    },
    {
      quizNo: 2,
      teacherNo: 10,
      quizType: 2,
      quizTitle: "피타고라스 정리",
      quizQuestion: "직각삼각형에서 a^2 + b^2 = c^2 이 성립한다.",
      quizAnswer: "O",
      choices: {
        choices1: "O",
        choices2: "X",
        choices3: null,
        choices4: null,
        choices5: null,
      },
    },
  ];

  const getTypeName = (type) => {
    if (type === 1) return "5지선다";
    if (type === 2) return "O / X";
    return "단답형";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <h3 className="font-bold text-gray-200 text-base">⚔️ QUIZ 테이블 등록 현황</h3>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-all cursor-pointer">
          + 새 퀴즈 출제
        </button>
      </div>

      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.quizNo}
            className="bg-[#0b101d] border border-gray-800 p-5 rounded-xl text-sm flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-cyan-400">QUIZ_NO #{quiz.quizNo}</span>
                <span className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs">
                  {getTypeName(quiz.quizType)}
                </span>
                <span className="font-bold text-gray-100 text-base">{quiz.quizTitle}</span>
              </div>
              <div className="flex gap-2 text-xs">
                <button className="px-3 py-1 bg-[#162032] border border-gray-700 text-gray-300 rounded hover:border-gray-500 cursor-pointer">
                  수정
                </button>
                <button className="px-3 py-1 bg-red-950/30 border border-red-800/50 text-red-400 rounded hover:bg-red-900/40 cursor-pointer">
                  삭제
                </button>
              </div>
            </div>

            <p className="text-gray-400 text-xs bg-[#050811] p-3 rounded-lg border border-gray-800/60">
              <strong className="text-gray-300">문제 (QUIZ_QUESTION):</strong> {quiz.quizQuestion}
            </p>

            {/* CHOICES 영역 */}
            {quiz.quizType === 1 && (
              <div className="grid grid-cols-5 gap-2 text-xs text-gray-400 pt-1">
                <span className={quiz.quizAnswer === "1" ? "text-cyan-400 font-bold" : ""}>1. {quiz.choices.choices1}</span>
                <span className={quiz.quizAnswer === "2" ? "text-cyan-400 font-bold" : ""}>2. {quiz.choices.choices2}</span>
                <span className={quiz.quizAnswer === "3" ? "text-cyan-400 font-bold" : ""}>3. {quiz.choices.choices3}</span>
                <span className={quiz.quizAnswer === "4" ? "text-cyan-400 font-bold" : ""}>4. {quiz.choices.choices4}</span>
                <span className={quiz.quizAnswer === "5" ? "text-cyan-400 font-bold" : ""}>5. {quiz.choices.choices5}</span>
              </div>
            )}

            <div className="text-xs text-right text-emerald-400 font-bold">
              정답 (QUIZ_ANSWER): {quiz.quizAnswer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}