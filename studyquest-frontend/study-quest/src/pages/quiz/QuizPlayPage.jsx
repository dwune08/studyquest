import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getQuiz } from "../../api/quizApi";
import { submitResult } from "../../api/resultApi";

const QuizPlayPage = () => {
  const { quizNo } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const studentNo = 5;

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await getQuiz(quizNo);

        setQuiz(data);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
          "퀴즈를 불러오지 못했습니다."
        );
      }
    };

    loadQuiz();
  }, [quizNo]);

  const handleSubmit = async () => {
    if (!answer) {
      alert("답을 선택하거나 입력해 주세요.");
      return;
    }

    try {
      await submitResult({
        studentNo,
        quizNo: Number(quizNo),
        resultAnswer: String(answer),
      });

      navigate(
        `/quiz/${quizNo}/result`,
        {
          state: {
            quiz,
            answer,
          },
        }
      );
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "답안 제출에 실패했습니다."
      );
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] text-red-400">
        {error}
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] text-slate-300">
        퀴즈를 불러오는 중...
      </div>
    );
  }

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
                {quiz.quizTitle}
              </h2>
            </div>

            <span className="rounded-lg bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              Q.{quiz.quizNo}
            </span>

          </div>

          {/* 문제 */}
          <div className="p-8">

            <div className="mb-8 rounded-2xl border border-slate-700 bg-[#081225] p-7">

              <p className="mb-2 text-sm text-blue-400">
                QUESTION
              </p>

              <p className="text-xl font-bold leading-relaxed">
                {quiz.quizQuestion}
              </p>

            </div>

            {/* 1 = 5지선다 */}
            {quiz.quizType === 1 && (
              <div className="grid grid-cols-1 gap-4">

                {[
                  quiz.choice1,
                  quiz.choice2,
                  quiz.choice3,
                  quiz.choice4,
                  quiz.choice5,
                ].map(
                  (choice, index) =>
                    choice && (
                      <button
                        key={index}
                        onClick={() =>
                          setAnswer(index + 1)
                        }
                        className={`rounded-2xl border px-6 py-5 text-left transition ${
                          Number(answer) === index + 1
                            ? "border-blue-500 bg-blue-500/10 text-blue-300"
                            : "border-slate-700 bg-[#081225] hover:border-blue-500"
                        }`}
                      >
                        <span className="mr-4 font-bold text-blue-400">
                          {index + 1}
                        </span>

                        {choice}
                      </button>
                    )
                )}

              </div>
            )}

            {/* 2 = 빈칸 */}
            {quiz.quizType === 2 && (
              <div>

                <label className="mb-3 block text-sm text-slate-400">
                  정답 입력
                </label>

                <input
                  value={answer}
                  onChange={(e) =>
                    setAnswer(e.target.value)
                  }
                  placeholder="정답을 입력하세요"
                  className="w-full rounded-2xl border border-slate-700 bg-[#081225] px-6 py-5 outline-none transition focus:border-blue-500"
                />

              </div>
            )}

            {/* 3 = O/X */}
            {quiz.quizType === 3 && (
              <div className="grid grid-cols-2 gap-6">

                <button
                  onClick={() => setAnswer(1)}
                  className={`rounded-2xl border py-16 text-7xl font-black transition ${
                    Number(answer) === 1
                      ? "border-blue-500 bg-blue-500/10 text-blue-400"
                      : "border-slate-700 bg-[#081225] text-blue-400 hover:border-blue-500"
                  }`}
                >
                  O
                </button>

                <button
                  onClick={() => setAnswer(2)}
                  className={`rounded-2xl border py-16 text-7xl font-black transition ${
                    Number(answer) === 2
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
              onClick={() => navigate("/quiz")}
              className="rounded-xl border border-slate-700 py-4 text-slate-300 hover:border-blue-500"
            >
              ← 퀴즈 목록
            </button>

            <button
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