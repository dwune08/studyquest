import { useEffect, useState } from "react";
import jwtAxios from "../../api/jwtAxios"; // 프로젝트 구조에 맞는 경로 확인
import { useCustomNavigate } from "../../hooks/useCustomNavigate"; // 커스텀 훅 경로 확인

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 커스텀 네비게이션 훅 사용
  const { goStudentMyPage, goQuizDetail } = useCustomNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        // 백엔드 퀴즈 목록 API 호출
        const res = await jwtAxios.get("/quizzes");
        setQuizzes(res.data);
      } catch (err) {
        console.error("퀴즈 목록 로딩 실패:", err);
        setError("퀴즈 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        {/* 상단 타이틀 헤더 */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-[0.2em]">
            🗡️ STUDY:QUEST
          </h1>
          <p className="mt-3 text-blue-400">QUIZ DUNGEON</p>
          <h2 className="mt-2 text-2xl font-bold">퀴즈 던전</h2>
        </div>

        {/* 퀴즈 목록 카드 */}
        <div className="rounded-3xl border border-slate-700 bg-[#0f1a2e] p-8 shadow-[0_0_40px_rgba(37,99,235,0.12)]">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-400">QUEST LIST</p>
              <h3 className="mt-1 text-2xl font-bold">도전할 퀴즈를 선택하세요</h3>
            </div>

            {/* 마이페이지 이동 */}
            <button
              onClick={goStudentMyPage}
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:border-blue-500 cursor-pointer"
            >
              마이페이지
            </button>
          </div>

          {/* 로딩 / 에러 UI */}
          {loading && (
            <div className="py-12 text-center text-slate-400">
              퀴즈 던전으로 이동하는 중...
            </div>
          )}

          {error && (
            <div className="py-12 text-center text-red-400">{error}</div>
          )}

          {/* 퀴즈 아이템 리스트 */}
          {!loading && !error && (
            <div className="space-y-4">
              {quizzes.length > 0 ? (
                quizzes.map((quiz, index) => (
                  <button
                    key={quiz.quizNo || index}
                    onClick={() => goQuizDetail(quiz.quizNo)}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-700 bg-[#081225] px-6 py-5 text-left transition hover:border-blue-500 hover:bg-[#0b1730] cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 font-bold">
                        Q{index + 1}
                      </div>

                      <div>
                        <p className="text-lg font-bold">{quiz.title}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {quiz.type}
                        </p>
                      </div>
                    </div>

                    <span className="text-blue-400">도전하기 →</span>
                  </button>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400">
                  등록된 퀴즈가 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizListPage;