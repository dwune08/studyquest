import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jwtAxios from "../../api/jwtAxios";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";

const QuizDetailPage = () => {
  // 라우터 설정의 path: ":no" 에 맞춰 'no'로 구조분해 할당 (또는 no: quizNo 별칭 지정)
  const { no: quizNo } = useParams();
  const navigate = useNavigate();
  const { goQuizList } = useCustomNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. GET /quizzes/{quizNo} API 연동
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("요청 quizNo:", quizNo);
        const res = await jwtAxios.get(`/quizzes/${quizNo}`);
        console.log("백엔드 응답:", res.data);

        if (res.data) {
          setQuiz(res.data);
        } else {
          setError("퀴즈 데이터를 불러올 수 없습니다.");
        }
      } catch (err) {
        console.error("퀴즈 로딩 실패:", err);
        setError(err.response?.data?.message || "퀴즈를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (quizNo) {
      loadQuiz();
    }
  }, [quizNo]);

  // 2. 답안 제출
  const handleSubmit = async () => {
    if (!answer && answer !== 0) {
      alert("답을 선택하거나 입력해 주세요.");
      return;
    }

    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const studentNo = storedUser.userNo || null;

      const resultDTO = {
        studentNo: studentNo,
        quizNo: Number(quizNo),
        resultAnswer: String(answer),
      };

      const res = await jwtAxios.post("/results", resultDTO);

      navigate(`/quizzes/${quizNo}/result`, {
        state: {
          quiz,
          answer,
          result: res.data,
        },
      });
    } catch (err) {
      console.error("답안 제출 실패:", err);
      alert(err.response?.data?.message || "답안 제출에 실패했습니다.");
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#020617] text-red-400 gap-4">
        <p>{error}</p>
        <button
          onClick={goQuizList}
          className="rounded-xl border border-slate-700 px-5 py-2 text-sm text-slate-300 hover:border-blue-500 cursor-pointer"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] text-slate-300">
        퀴즈를 불러오는 중...
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#020617] text-slate-400 gap-4">
        <p>존재하지 않거나 불러올 수 없는 퀴즈입니다.</p>
        <button
          onClick={goQuizList}
          className="rounded-xl border border-slate-700 px-5 py-2 text-sm text-slate-300 hover:border-blue-500 cursor-pointer"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  const quizTypeNum = Number(quiz.quizType);

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        {/* LOGO */}
        <h1 className="mb-8 text-center text-3xl font-black tracking-[0.2em]">
          🗡️ STUDY:QUEST
        </h1>

        <div className="overflow-hidden rounded-3xl border border-slate-700 bg-[#0f1a2e] shadow-[0_0_40px_rgba(37,99,235,0.14)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-700 px-8 py-5">
            <div>
              <p className="text-xs text-blue-400">QUIZ DUNGEON</p>
              <h2 className="mt-1 text-lg font-bold">{quiz.quizTitle}</h2>
            </div>
            <span className="rounded-lg bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
              Q.{quiz.quizNo}
            </span>
          </div>

          {/* Question Box */}
          <div className="p-8">
            <div className="mb-8 rounded-2xl border border-slate-700 bg-[#081225] p-7">
              <p className="mb-2 text-sm text-blue-400">QUESTION</p>
              <p className="text-xl font-bold leading-relaxed">
                {quiz.quizQuestion}
              </p>
            </div>

            {/* 0 = 5지선다 */}
            {quizTypeNum === 0 && (
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
                        onClick={() => setAnswer(index + 1)}
                        className={`rounded-2xl border px-6 py-5 text-left transition cursor-pointer ${
                          Number(answer) === index + 1
                            ? "border-blue-500 bg-blue-500/10 text-blue-300 shadow-md shadow-blue-500/10"
                            : "border-slate-700 bg-[#081225] hover:border-blue-500"
                        }`}
                      >
                        <span className="mr-4 font-bold text-blue-400">
                          {index + 1}.
                        </span>
                        {choice}
                      </button>
                    )
                )}
              </div>
            )}

            {/* 1 = 빈칸채우기 */}
            {quizTypeNum === 1 && (
              <div>
                <label className="mb-3 block text-sm text-slate-400">
                  정답 입력
                </label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="정답을 입력하세요"
                  className="w-full rounded-2xl border border-slate-700 bg-[#081225] px-6 py-5 outline-none transition focus:border-blue-500"
                />
              </div>
            )}

            {/* 2 = O/X 퀴즈 */}
            {quizTypeNum === 2 && (
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => setAnswer("O")}
                  className={`rounded-2xl border py-16 text-7xl font-black transition cursor-pointer ${
                    String(answer) === "O"
                      ? "border-blue-500 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/20"
                      : "border-slate-700 bg-[#081225] text-blue-400 hover:border-blue-500"
                  }`}
                >
                  O
                </button>

                <button
                  onClick={() => setAnswer("X")}
                  className={`rounded-2xl border py-16 text-7xl font-black transition cursor-pointer ${
                    String(answer) === "X"
                      ? "border-red-500 bg-red-500/10 text-red-400 shadow-lg shadow-red-500/20"
                      : "border-slate-700 bg-[#081225] text-red-400 hover:border-red-500"
                  }`}
                >
                  X
                </button>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-700 px-8 py-6">
            <button
              onClick={goQuizList}
              className="rounded-xl border border-slate-700 py-4 font-semibold text-slate-300 transition hover:border-blue-500 cursor-pointer"
            >
              ← 퀴즈 목록
            </button>

            <button
              onClick={handleSubmit}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] transition hover:brightness-110 cursor-pointer"
            >
              답안 제출
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailPage;