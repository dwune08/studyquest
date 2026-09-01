import { useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { findQuizByNo } from "../../data/quizData";
import "../../styles/quiz.css";

const QuizPlayPage = () => {
  const { quizNo } = useParams();
  const navigate = useNavigate();

  // URL의 quizNo에 해당하는 로컬 퀴즈 조회
  const quiz = findQuizByNo(quizNo);

  // 사용자가 선택하거나 입력한 답
  const [answer, setAnswer] = useState("");

  if (!quiz) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] px-6 text-white">
        <div className="rounded-2xl border border-slate-700 bg-[#0f1a2e] p-10 text-center">
          <h1 className="mb-4 text-2xl font-bold">
            퀴즈를 찾을 수 없습니다.
          </h1>

          <button
            type="button"
            onClick={() => navigate("/quizzes")}
            className="rounded-xl bg-blue-600 px-6 py-3 font-bold"
          >
            퀴즈 목록으로
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    const submittedAnswer =
      String(answer).trim();

    if (!submittedAnswer) {
      alert("답을 선택하거나 입력해 주세요.");
      return;
    }

    const isCorrect =
      submittedAnswer.toLowerCase() ===
      String(quiz.answer).trim().toLowerCase();

    navigate(
      `/quizzes/${quiz.quizNo}/result`,
      {
        state: {
          quiz,
          submittedAnswer,
          isCorrect,
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        {/* LOGO */}
        <h1 className="mb-8 text-center text-3xl font-black tracking-[0.2em]">
          🗡️ STUDY:QUEST
        </h1>

        <div className="overflow-hidden rounded-3xl border border-slate-700 bg-[#0f1a2e] shadow-[0_0_40px_rgba(37,99,235,0.14)]">
          {/* 상단 */}
          <div className="flex items-center justify-between border-b border-slate-700 px-8 py-5">
            <div>
              <p className="text-xs text-blue-400">
                QUIZ DUNGEON
              </p>

              <h2 className="mt-1 font-bold">
                {quiz.title}
              </h2>
            </div>

            <span className="rounded-lg bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              {quiz.code}
            </span>
          </div>

          {/* 문제 */}
          <div className="p-8">
            <div className="mb-8 rounded-2xl border border-slate-700 bg-[#081225] p-7">
              <p className="mb-2 text-sm text-blue-400">
                QUESTION
              </p>

              <p className="text-xl font-bold leading-relaxed">
                {quiz.question}
              </p>
            </div>

            {/* 오지선다 */}
            {quiz.type ===
              "MULTIPLE_CHOICE" && (
              <div className="grid grid-cols-1 gap-4">
                {quiz.choices.map(
                  (choice, index) => {
                    const selected =
                      answer === choice.text;

                    return (
                      <button
                        type="button"
                        key={choice.choiceNo}
                        onClick={() =>
                          setAnswer(choice.text)
                        }
                        className={`rounded-2xl border px-6 py-5 text-left transition ${
                          selected
                            ? "border-blue-500 bg-blue-500/10 text-blue-300"
                            : "border-slate-700 bg-[#081225] hover:border-blue-500"
                        }`}
                      >
                        <span className="mr-4 font-bold text-blue-400">
                          {index + 1}
                        </span>

                        {choice.text}
                      </button>
                    );
                  },
                )}
              </div>
            )}

            {/* 빈칸 채우기 */}
            {quiz.type === "FILL_BLANK" && (
              <div>
                {quiz.expression && (
                  <div className="mb-8 rounded-2xl border border-blue-500/30 bg-blue-500/5 px-6 py-8 text-center text-4xl font-black tracking-widest">
                    {quiz.expression}
                  </div>
                )}

                <label
                  className="mb-3 block text-sm text-slate-400"
                  htmlFor="quizAnswer"
                >
                  정답 입력
                </label>

                <input
                  id="quizAnswer"
                  value={answer}
                  onChange={(event) =>
                    setAnswer(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  placeholder="정답을 입력하세요."
                  autoComplete="off"
                  className="w-full rounded-2xl border border-slate-700 bg-[#081225] px-6 py-5 text-center text-xl outline-none transition focus:border-blue-500"
                />
              </div>
            )}

            {/* OX 문제 */}
            {quiz.type === "OX" && (
              <div className="grid grid-cols-2 gap-6">
                <button
                  type="button"
                  onClick={() => setAnswer("O")}
                  className={`rounded-2xl border py-16 text-7xl font-black transition ${
                    answer === "O"
                      ? "border-blue-500 bg-blue-500/10 text-blue-400"
                      : "border-slate-700 bg-[#081225] text-blue-400 hover:border-blue-500"
                  }`}
                >
                  O
                </button>

                <button
                  type="button"
                  onClick={() => setAnswer("X")}
                  className={`rounded-2xl border py-16 text-7xl font-black transition ${
                    answer === "X"
                      ? "border-red-500 bg-red-500/10 text-red-400"
                      : "border-slate-700 bg-[#081225] text-red-400 hover:border-red-500"
                  }`}
                >
                  X
                </button>
              </div>
            )}
          </div>

          {/* 하단 */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-700 px-8 py-6">
            <button
              type="button"
              onClick={() =>
                navigate("/quizzes")
              }
              className="rounded-xl border border-slate-700 py-4 text-slate-300 hover:border-blue-500"
            >
              ← 퀴즈 목록
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:brightness-110"
            >
              답안 제출
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPlayPage;