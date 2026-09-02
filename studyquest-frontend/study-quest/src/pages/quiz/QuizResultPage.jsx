import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import "../../styles/quiz.css";

const QuizResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizNo } = useParams();
  const { state } = useLocation();


  const { quiz, answer } =
    location.state || {};

  if (!quiz) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
        결과 정보가 없습니다.
      </div>
    );
  }

  const correct =
    String(quiz.quizAnswer) ===
    String(answer);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] px-6 text-white">

      <div className="w-full max-w-xl rounded-3xl border border-slate-700 bg-[#0f1a2e] p-10 text-center shadow-[0_0_40px_rgba(37,99,235,0.15)]">

        <p className="text-sm text-blue-400">
          QUEST RESULT
        </p>

        <div className="my-8 text-8xl">
          {correct ? "🏆" : "💀"}
        </div>

        <h1
          className={`text-4xl font-black ${
            correct
              ? "text-blue-400"
              : "text-red-400"
          }`}
        >
          {correct ? "정답!" : "오답!"}
        </h1>

        <div className="mt-8 rounded-2xl bg-[#081225] p-6 text-left">

          <p className="text-sm text-slate-500">
            문제
          </p>

          <p className="mt-1">
            {quiz.quizQuestion}
          </p>

          <p className="mt-5 text-sm text-slate-500">
            제출한 답
          </p>

          <p className="mt-1 text-blue-400">
            {answer}
          </p>

        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">

          <button
            onClick={() =>
              navigate("/mypage")
            }
            className="rounded-xl border border-slate-700 py-4"
          >
            마이페이지
          </button>

          <button
            onClick={() =>
              navigate("/quizzes")
            }
            className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-bold"
          >
            계속 도전
          </button>

        </div>

      </div>

    </div>
  );
};

export default QuizResultPage;