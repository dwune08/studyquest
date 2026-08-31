//import { useSearchParams } from "react-router";
//import BasicLayout from "../../layouts/BasicLayout";

/*const QuizListPage = () => {
  const [queryParams] = useSearchParams();

  const page = parseInt(queryParams.get("page")) || 1;
  const size = parseInt(queryParams.get("size")) || 10;

  return (
    <BasicLayout>
         <div className='text-3xl'>
            퀴즈 리스트 {page} --- {size}
         </div>
    </BasicLayout>
  );
};

export default QuizListPage;*/

import { useNavigate } from "react-router-dom";

const QuizListPage = () => {
  const navigate = useNavigate();

  // 일단 UI 확인용.
  // 다음 단계에서 Oracle API 데이터로 바꿀 예정.
  const quizzes = [
    {
      quizNo: 1,
      title: "수학 기초 퀴즈",
      type: "5지선다",
    },
    {
      quizNo: 2,
      title: "OX 상식 퀴즈",
      type: "O / X",
    },
    {
      quizNo: 3,
      title: "빈칸 채우기",
      type: "빈칸",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-10 text-white">

      <div className="mx-auto max-w-5xl">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-[0.2em]">
            🗡️ STUDY:QUEST
          </h1>

          <p className="mt-3 text-blue-400">
            QUIZ DUNGEON
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            퀴즈 던전
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-[#0f1a2e] p-8 shadow-[0_0_40px_rgba(37,99,235,0.12)]">

          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-400">
                QUEST LIST
              </p>

              <h3 className="mt-1 text-2xl font-bold">
                도전할 퀴즈를 선택하세요
              </h3>
            </div>

            <button
              onClick={() => navigate("/mypage")}
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 hover:border-blue-500"
            >
              마이페이지
            </button>
          </div>

          <div className="space-y-4">
            {quizzes.map((quiz, index) => (
              <button
                key={quiz.quizNo}
                onClick={() =>
                  navigate(`/quiz/${quiz.quizNo}`)
                }
                className="flex w-full items-center justify-between rounded-2xl border border-slate-700 bg-[#081225] px-6 py-5 text-left transition hover:border-blue-500 hover:bg-[#0b1730]"
              >
                <div className="flex items-center gap-5">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 font-bold">
                    Q{index + 1}
                  </div>

                  <div>
                    <p className="text-lg font-bold">
                      {quiz.title}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {quiz.type}
                    </p>
                  </div>

                </div>

                <span className="text-blue-400">
                  도전하기 →
                </span>
              </button>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};

export default QuizListPage;
