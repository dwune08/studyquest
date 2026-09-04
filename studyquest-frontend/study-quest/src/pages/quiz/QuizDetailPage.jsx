import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jwtAxios from "../../api/jwtAxios";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";
import { useAuth } from "../../hooks/useAuth";
import BasicLayout from "../../layouts/BasicLayout";

const QuizDetailPage = () => {
  const { no: quizNo } = useParams();
  const { goQuizList, goQuizResult, goLogin } = useCustomNavigate();
  const { user, studentNo, currentNo } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. 퀴즈 상세 데이터 조회
  useEffect(() => {
    if (!quizNo) return;

    const fetchQuizDetail = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await jwtAxios.get(`/quizzes/${quizNo}`);
        if (res.data) {
          setQuiz(res.data);
        } else {
          setError("퀴즈 데이터를 불러올 수 없습니다.");
        }
      } catch (err) {
        console.error("퀴즈 로딩 실패:", err);
        setError(err.response?.data?.message || "퀴즈를 불러오지 못했습니다.");
      } finally { // 👈 36번째 줄 오타(font-medium -> finally) 수정
        setLoading(false);
      }
    };

    fetchQuizDetail();
  }, [quizNo]);

  // 2. 답안 제출 처리
  const handleSubmit = async () => {
    if (answer === "" || answer === null || answer === undefined) {
      alert("답을 선택하거나 입력해 주세요.");
      return;
    }

    const targetStudentNo = studentNo || currentNo || user?.userNo;

    if (!targetStudentNo) {
      alert("학생 정보를 확인할 수 없습니다. 다시 로그인해 주세요.");
      return;
    }

    try {
      const resultDTO = {
        studentNo: Number(targetStudentNo),
        quizNo: Number(quizNo),
        resultAnswer: String(answer),
      };

      const res = await jwtAxios.post("/results", resultDTO);

      const resultData = {
        isCorrect: res.data.correct ?? res.data.isCorrect,
        resultAnswer: String(answer),
      };

      if (typeof goQuizResult === "function") {
        goQuizResult(quizNo, { quiz, resultData });
      } else {
        window.location.href = `/quizzes/${quizNo}/result`;
      }
    } catch (err) {
      console.error("답안 제출 실패:", err);
      alert(err.response?.data?.message || "답안 제출에 실패했습니다.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    goLogin();
  };

  const topMenuUserInfo = {
    role: "student",
    userType: 1,
    userName: user?.userName || user?.name || "모험가",
    userLevel: user?.userLevel || user?.level || 1,
    currentExp: user?.currentExp || user?.exp || 0,
    maxExp: user?.maxExp || 100,
  };

  if (loading) {
    return (
      <BasicLayout userType="student" userInfo={topMenuUserInfo} onLogout={handleLogout}>
        <div className="flex min-h-[60vh] items-center justify-center text-slate-400 text-sm">
          퀴즈를 불러오는 중...
        </div>
      </BasicLayout>
    );
  }

  if (error || !quiz) {
    return (
      <BasicLayout userType="student" userInfo={topMenuUserInfo} onLogout={handleLogout}>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-red-400 gap-4">
          <p className="text-sm">{error || "존재하지 않거나 불러올 수 없는 퀴즈입니다."}</p>
          <button
            type="button"
            onClick={goQuizList}
            className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-2 text-xs text-slate-300 hover:border-blue-500 cursor-pointer"
          >
            목록으로 돌아가기
          </button>
        </div>
      </BasicLayout>
    );
  }

  // quizType 정규화
  const quizTypeRaw = String(quiz.quizType ?? "").toUpperCase();

  const isMultipleChoice =
    quizTypeRaw === "0" ||
    quizTypeRaw.includes("MULTIPLE") ||
    quizTypeRaw.includes("CHOICE");

  const isShortAnswer =
    quizTypeRaw === "1" ||
    quizTypeRaw.includes("SHORT") ||
    quizTypeRaw.includes("SUBJECTIVE");

  const isOX =
    quizTypeRaw === "2" ||
    quizTypeRaw.includes("OX");

  const choices = [
    quiz.choice1,
    quiz.choice2,
    quiz.choice3,
    quiz.choice4,
    quiz.choice5,
  ].filter(Boolean);

  return (
    <BasicLayout userType="student" userInfo={topMenuUserInfo} onLogout={handleLogout}>
      <div className="w-full max-w-5xl mx-auto px-5 py-6 text-white flex flex-col justify-center min-h-[calc(100vh-140px)]">
        
        {/* 메인 퀴즈 카드 */}
        <div className="rounded-2xl border border-slate-800 bg-[#0f1a2e]/90 p-6 sm:p-7 shadow-[0_0_35px_rgba(37,99,235,0.1)] backdrop-blur-sm">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-5">
            <div>
              <p className="text-xs font-bold tracking-wider text-blue-400">QUIZ DUNGEON</p>
              <h2 className="mt-1 text-xl font-bold text-slate-100">{quiz.quizTitle}</h2>
            </div>
            <span className="rounded-xl border border-blue-500/30 bg-blue-950/50 px-4 py-1.5 text-xs font-bold text-blue-300">
              Q.{quiz.quizNo}
            </span>
          </div>

          {/* Question Box */}
          <div className="py-6">
            <div className="mb-6 rounded-xl border border-slate-800 bg-[#081225]/80 p-5 sm:p-6">
              <p className="mb-1.5 text-xs font-bold text-blue-400">QUESTION</p>
              <p className="text-lg font-bold leading-relaxed text-slate-100">
                {quiz.quizQuestion}
              </p>
            </div>

            {/* TYPE 0 / MULTIPLE_CHOICE: 5지선다 */}
            {isMultipleChoice && (
              <div className="grid grid-cols-1 gap-3">
                {choices.map((choice, index) => {
                  const choiceNum = index + 1;
                  const isSelected = String(answer) === String(choiceNum);
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setAnswer(choiceNum)}
                      className={`rounded-xl border px-5 py-3.5 text-left text-sm transition cursor-pointer ${
                        isSelected
                          ? "border-blue-500 bg-blue-950/70 text-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.2)] font-semibold"
                          : "border-slate-800/80 bg-[#081225]/60 text-slate-300 hover:border-slate-700 hover:bg-[#0c182e]"
                      }`}
                    >
                      <span className="mr-3.5 font-bold text-blue-400">
                        {choiceNum}.
                      </span>
                      {choice}
                    </button>
                  );
                })}
              </div>
            )}

            {/* TYPE 1 / SHORT_ANSWER: 주관식 */}
            {isShortAnswer && (
              <div>
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  정답 입력
                </label>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="정답을 입력하세요"
                  className="w-full rounded-xl border border-slate-800 bg-[#081225]/80 px-5 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500"
                />
              </div>
            )}

            {/* TYPE 2 / OX: O/X */}
            {isOX && (
              <div className="grid grid-cols-2 gap-5">
                {["O", "X"].map((option) => {
                  const isSelected = String(answer) === option;
                  const isO = option === "O";
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswer(option)}
                      className={`rounded-xl border py-12 text-6xl font-black transition cursor-pointer ${
                        isSelected
                          ? isO
                            ? "border-blue-500 bg-blue-950/70 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                            : "border-rose-500 bg-rose-950/70 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                          : isO
                          ? "border-slate-800 bg-[#081225]/80 text-blue-400 hover:border-blue-500/50"
                          : "border-slate-800 bg-[#081225]/80 text-rose-400 hover:border-rose-500/50"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 예외 처리 */}
            {!isMultipleChoice && !isShortAnswer && !isOX && (
              <div className="rounded-xl border border-dashed border-slate-800 p-5 text-center text-xs text-slate-500">
                지원하지 않거나 알 수 없는 퀴즈 타입입니다. (quizType: {String(quiz.quizType)})
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-5">
            <button
              type="button"
              onClick={goQuizList}
              className="rounded-xl border border-slate-700 bg-slate-900/80 py-3.5 text-xs font-semibold text-slate-300 transition hover:border-slate-500 active:scale-95 cursor-pointer"
            >
              ← 퀴즈 목록
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-xs font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] transition hover:brightness-110 active:scale-95 cursor-pointer"
            >
              답안 제출
            </button>
          </div>

        </div>
      </div>
    </BasicLayout>
  );
};

export default QuizDetailPage;