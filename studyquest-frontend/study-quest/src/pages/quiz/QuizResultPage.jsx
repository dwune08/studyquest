import { useLocation } from "react-router-dom";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";
import "../../styles/quiz.css";

const QuizResultPage = () => {
  const { goStudentMyPage, goQuizList } = useCustomNavigate();
  const location = useLocation();

  const { quiz, resultData } = location.state || {};

  if (!quiz || !resultData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
        결과 정보가 없습니다.
      </div>
    );
  }

  const { isCorrect, resultAnswer } = resultData;
  const quizTypeNum = Number(quiz.quizType);

  // 선택지 배열 구성 (1번~5번)
  const choices = [
    quiz.choice1,
    quiz.choice2,
    quiz.choice3,
    quiz.choice4,
    quiz.choice5,
  ].filter(Boolean);

  // 답안 텍스트 파싱 함수 (객관식, 주관식, OX 통합)
  const formatAnswerText = (rawAnswer) => {
    if (rawAnswer === null || rawAnswer === undefined || rawAnswer === "") {
      return "답안 없음";
    }

    const strAns = String(rawAnswer).trim();

    // TYPE 0: 5지선다 -> 번호와 선택지 내용 표기
    if (quizTypeNum === 0) {
      const idx = Number(strAns) - 1;
      if (!isNaN(idx) && choices[idx]) {
        return `${strAns}. ${choices[idx]}`;
      }
      return strAns;
    }

    // TYPE 2: OX 퀴즈 -> 1/2 내부 값을 O/X 문자로 변환
    if (quizTypeNum === 2) {
      if (strAns === "1" || strAns.toUpperCase() === "O") return "O";
      if (strAns === "2" || strAns.toUpperCase() === "X") return "X";
      return strAns;
    }

    // TYPE 1: 주관식 -> 그대로 출력
    return strAns;
  };

  // 문제 유형별 보상 스탯 텍스트 정의
  const getRewardStatText = (type) => {
    switch (Number(type)) {
      case 0:
        return "공격력 +1";
      case 1:
        return "지혜 +1";
      case 2:
        return "스피드 +1";
      default:
        return "";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] px-6 py-10 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-slate-700 bg-[#0f1a2e] p-10 text-center shadow-[0_0_40px_rgba(37,99,235,0.15)]">
        <p className="text-sm font-semibold tracking-wider text-blue-400">
          QUEST RESULT
        </p>

        <div className="my-8 text-8xl transition-transform duration-300 hover:scale-110">
          {isCorrect ? "🏆" : "💀"}
        </div>

        <h1
          className={`text-4xl font-black ${
            isCorrect ? "text-blue-400" : "text-red-400"
          }`}
        >
          {isCorrect ? "퀘스트 완료!" : "퀘스트 실패!"}
        </h1>

        {/* 정답 보상 상자 */}
        {isCorrect && (
          <div className="mt-6 flex items-center justify-center gap-4 rounded-2xl border border-blue-500/30 bg-blue-950/40 p-4">
            <span className="rounded-lg bg-blue-500/20 px-3 py-1 text-sm font-bold text-blue-300">
              EXP +10
            </span>
            <span className="rounded-lg bg-violet-500/20 px-3 py-1 text-sm font-bold text-violet-300">
              {getRewardStatText(quiz.quizType)}
            </span>
          </div>
        )}

        {/* 문제 상세 및 제출/정답 비교 상자 */}
        <div className="mt-8 space-y-5 rounded-2xl border border-slate-800 bg-[#081225] p-6 text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              문제
            </p>
            <p className="mt-1 text-base font-medium text-slate-200">
              {quiz.quizQuestion}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-slate-800/80 pt-4 sm:grid-cols-2">
            {/* 제출한 답 */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                제출한 답
              </p>
              <p
                className={`mt-2 text-base font-bold ${
                  isCorrect ? "text-blue-400" : "text-red-400"
                }`}
              >
                {formatAnswerText(resultAnswer)}
              </p>
            </div>

            {/* 실제 정답 */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                정답
              </p>
              <p className="mt-2 text-base font-bold text-emerald-400">
                {formatAnswerText(quiz.quizAnswer)}
              </p>
            </div>
          </div>
        </div>

        {/* 하단 이동 버튼 */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={goStudentMyPage}
            className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800/50 py-4 font-semibold text-slate-300 transition-colors hover:bg-slate-800"
          >
            마이페이지
          </button>

          <button
            onClick={goQuizList}
            className="cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:brightness-110"
          >
            계속 도전
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResultPage;