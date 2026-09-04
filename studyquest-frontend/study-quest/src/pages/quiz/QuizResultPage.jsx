import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import jwtAxios from "../../api/jwtAxios";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";
import BasicLayout from "../../layouts/BasicLayout";

const QuizResultPage = () => {
  const { goStudentMyPage, goQuizList, goLogin } = useCustomNavigate();
  const location = useLocation();

  // Redux 로그인 상태 가져오기
  const loginUser = useSelector((state) => state.loginSlice);

  // 헤더 및 사용자 상태 관리
  const [userStatus, setUserStatus] = useState(null);

  // 1. 새로고침 시 location.state 유실 방지를 위한 SessionStorage 백업 처리
  const [resultInfo] = useState(() => {
    if (location.state?.quiz && location.state?.resultData) {
      sessionStorage.setItem("last_quiz_result", JSON.stringify(location.state));
      return location.state;
    }
    const saved = sessionStorage.getItem("last_quiz_result");
    return saved ? JSON.parse(saved) : null;
  });

  // 유저 최신 데이터(EXP, Level 등) 조회
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await jwtAxios.get("/mypage/me");
        if (res.data?.status) {
          setUserStatus(res.data.status);
        }
      } catch (error) {
        console.error("결과 페이지 유저 데이터 조회 실패:", error);
        // 실패 시 localStorage 데이터로 Fallback
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
          const parsed = JSON.parse(storedUserInfo);
          setUserStatus(parsed);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.removeItem("last_quiz_result");
    goLogin();
  };

  // 상단 헤더(BasicLayout) 전달용 유저 정보 객체 정제
  const topMenuUserInfo = {
    role: "student",
    userType: 1,
    userName: userStatus?.studentName || loginUser?.userName || "모험가",
    userLevel: userStatus?.statusLevel ?? loginUser?.userLevel ?? 1,
    currentExp: userStatus?.statusExp ?? loginUser?.currentExp ?? 0,
    maxExp: userStatus?.nextLevelExp ?? loginUser?.maxExp ?? 100,
  };

  // 데이터가 아예 없는 예외 케이스
  if (!resultInfo || !resultInfo.quiz || !resultInfo.resultData) {
    return (
      <BasicLayout userType="student" userInfo={topMenuUserInfo} onLogout={handleLogout}>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-white">
          <p className="text-sm text-slate-400">결과 정보를 찾을 수 없습니다.</p>
          <button
            type="button"
            onClick={goQuizList}
            className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-2 text-xs text-slate-300 hover:border-blue-500 cursor-pointer"
          >
            퀴즈 목록으로 이동
          </button>
        </div>
      </BasicLayout>
    );
  }

  const { quiz, resultData } = resultInfo;
  const { isCorrect, resultAnswer } = resultData;

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

  // 답안 파싱 함수
  const formatAnswerText = (rawAnswer) => {
    if (rawAnswer === null || rawAnswer === undefined || rawAnswer === "") {
      return "답안 없음";
    }

    const strAns = String(rawAnswer).trim();

    if (isMultipleChoice) {
      const idx = Number(strAns) - 1;
      if (!isNaN(idx) && choices[idx]) {
        return `${strAns}. ${choices[idx]}`;
      }
      return strAns;
    }

    if (isOX) {
      const upperAns = strAns.toUpperCase();
      if (upperAns === "1" || upperAns === "O" || upperAns === "TRUE") return "O";
      if (upperAns === "2" || upperAns === "X" || upperAns === "FALSE") return "X";
      return upperAns;
    }

    return strAns;
  };

  const getRewardStatText = () => {
    if (isMultipleChoice) return "공격력 +1";
    if (isShortAnswer) return "지혜 +1";
    if (isOX) return "스피드 +1";
    return "";
  };

  return (
    <BasicLayout userType="student" userInfo={topMenuUserInfo} onLogout={handleLogout}>
      <div className="w-full max-w-5xl mx-auto px-5 py-6 text-white flex items-center justify-center min-h-[calc(100vh-140px)] box-border text-base">
        <div className="w-full max-w-xl rounded-3xl border border-slate-700/80 bg-[#0f1a2e]/90 p-8 sm:p-10 text-center shadow-[0_0_40px_rgba(37,99,235,0.15)] backdrop-blur-sm box-border">
          
          <p className="text-xs font-bold tracking-wider text-blue-400 uppercase">
            QUEST RESULT
          </p>

          <div className="my-6 text-7xl sm:text-8xl transition-transform duration-300 hover:scale-105">
            {isCorrect ? "🏆" : "💀"}
          </div>

          <h1
            className={`text-3xl sm:text-4xl font-black tracking-tight ${
              isCorrect ? "text-blue-400" : "text-red-400"
            }`}
          >
            {isCorrect ? "퀘스트 완료!" : "퀘스트 실패!"}
          </h1>

          {/* 정답 보상 상자 */}
          {isCorrect && (
            <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4 rounded-2xl border border-blue-500/30 bg-blue-950/40 p-4">
              <span className="rounded-lg bg-blue-500/20 px-3 py-1 text-xs sm:text-sm font-bold text-blue-300">
                EXP +10
              </span>
              <span className="rounded-lg bg-violet-500/20 px-3 py-1 text-xs sm:text-sm font-bold text-violet-300">
                {getRewardStatText()}
              </span>
            </div>
          )}

          {/* 문제 상세 및 제출/정답 비교 상자 */}
          <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 rounded-2xl border border-slate-800 bg-[#081225]/90 p-5 sm:p-6 text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                문제
              </p>
              <p className="mt-1.5 text-sm sm:text-base font-medium leading-relaxed text-slate-200">
                {quiz.quizQuestion}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 border-t border-slate-800/80 pt-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 sm:p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  제출한 답
                </p>
                <p
                  className={`mt-1.5 text-sm sm:text-base font-bold ${
                    isCorrect ? "text-blue-400" : "text-red-400"
                  }`}
                >
                  {formatAnswerText(resultAnswer)}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 sm:p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  정답
                </p>
                <p className="mt-1.5 text-sm sm:text-base font-bold text-emerald-400">
                  {formatAnswerText(quiz.quizAnswer)}
                </p>
              </div>
            </div>
          </div>

          {/* 하단 이동 버튼 */}
          <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={goStudentMyPage}
              className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800/50 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-800"
            >
              마이페이지
            </button>

            <button
              type="button"
              onClick={goQuizList}
              className="cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:brightness-110"
            >
              계속 도전
            </button>
          </div>

        </div>
      </div>
    </BasicLayout>
  );
};

export default QuizResultPage;