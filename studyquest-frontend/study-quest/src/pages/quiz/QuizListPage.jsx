import { useEffect, useState } from "react";
import jwtAxios from "../../api/jwtAxios";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";

const CATEGORIES = [
  { id: 0, name: "5지선다 퀴즈", desc: "객관식 문제를 풀고 포인트를 획득하세요", icon: "📝" },
  { id: 1, name: "빈칸채우기 퀴즈", desc: "알맞은 단어를 채워넣는 퀴즈입니다", icon: "✏️" },
  { id: 2, name: "O/X 퀴즈", desc: "참과 거짓을 빠르게 판단하세요", icon: "⭕" },
];

const QuizListPage = () => {
  // null이면 카테고리 선택 화면, 숫자(0,1,2)면 해당 퀴즈 목록 화면
  const [selectedType, setSelectedType] = useState(null); 
  const [quizzes, setQuizzes] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPage: 1,
    pageNumberList: [],
    prev: false,
    next: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { goStudentMyPage, goQuizDetail } = useCustomNavigate();

  const fetchQuizzes = async (type, page = 1) => {
    try {
      setLoading(true);
      setError(null);
      // quizType 파라미터 전달 및 5개씩 페이징
      const res = await jwtAxios.get(`/quizzes?quizType=${type}&page=${page}&size=5`);
      
      setQuizzes(res.data.dtoList || []);
      setPageInfo({
        currentPage: res.data.currentPage,
        totalPage: res.data.totalPage,
        pageNumberList: res.data.pageNumberList || [],
        prev: res.data.prev,
        next: res.data.next,
      });
    } catch (err) {
      console.error("퀴즈 목록 로딩 실패:", err);
      setError("퀴즈 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 카테고리가 선택되었을 때만 API 호출
  useEffect(() => {
  const loadData = async () => {
    await fetchQuizzes(selectedType, 1);
  };
  loadData();
}, [selectedType]);

  const handleCategorySelect = (type) => {
    setSelectedType(type);
  };

  const handlePageChange = (page) => {
    fetchQuizzes(selectedType, page);
  };

  const getCategoryTitle = (type) => {
    return CATEGORIES.find((c) => c.id === type)?.name || "퀴즈";
  };

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        {/* 상단 Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-[0.2em]">🗡️ STUDY:QUEST</h1>
          <p className="mt-3 text-blue-400">QUIZ DUNGEON</p>
          <h2 className="mt-2 text-2xl font-bold">퀴즈 던전</h2>
        </div>

        {/* Main Content Box */}
        <div className="rounded-3xl border border-slate-700 bg-[#0f1a2e] p-8 shadow-[0_0_40px_rgba(37,99,235,0.12)]">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-400">QUEST LIST</p>
              <h3 className="mt-1 text-2xl font-bold">
                {selectedType === null
                  ? "도전할 퀴즈 카테고리를 선택하세요"
                  : `${getCategoryTitle(selectedType)} 목록`}
              </h3>
            </div>

            <div className="flex gap-3">
              {/* 카테고리 선택 상태일 때 '뒤로가기' 버튼 */}
              {selectedType !== null && (
                <button
                  onClick={() => setSelectedType(null)}
                  className="rounded-xl border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700 cursor-pointer"
                >
                  ← 카테고리 선택
                </button>
              )}

              <button
                onClick={goStudentMyPage}
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:border-blue-500 cursor-pointer"
              >
                마이페이지
              </button>
            </div>
          </div>

          {/* 1. 카테고리 미선택 시 : 3개 선택 버튼 화면 */}
          {selectedType === null && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 py-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className="flex flex-col items-center justify-center rounded-2xl border border-slate-700 bg-[#081225] p-8 transition hover:-translate-y-1 hover:border-blue-500 hover:bg-[#0b1730] cursor-pointer group"
                >
                  <span className="text-5xl mb-4 transition transform group-hover:scale-110">{cat.icon}</span>
                  <h4 className="text-xl font-bold text-white mb-2">{cat.name}</h4>
                  <p className="text-xs text-slate-400 text-center">{cat.desc}</p>
                  <span className="mt-6 text-sm text-blue-400 font-semibold group-hover:underline">
                    입장하기 →
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* 2. 카테고리 선택 시 : 목록 및 페이징 UI */}
          {selectedType !== null && (
            <>
              {loading && <div className="py-12 text-center text-slate-400">퀴즈를 불러오는 중입니다...</div>}
              {error && <div className="py-12 text-center text-red-400">{error}</div>}

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
                            Q{(pageInfo.currentPage - 1) * 5 + index + 1}
                          </div>
                          <div>
                            <p className="text-lg font-bold">{quiz.quizTitle}</p>
                          </div>
                        </div>
                        <span className="text-blue-400">도전하기 →</span>
                      </button>
                    ))
                  ) : (
                    <div className="py-12 text-center text-slate-400">
                      등록된 {getCategoryTitle(selectedType)}가 없습니다.
                    </div>
                  )}

                  {/* 페이지네이션 (5개 단위) */}
                  {pageInfo.pageNumberList.length > 0 && (
                    <div className="mt-8 flex justify-center gap-2 pt-4">
                      {pageInfo.prev && (
                        <button
                          onClick={() => handlePageChange(pageInfo.currentPage - 1)}
                          className="rounded-lg border border-slate-700 px-3 py-1 text-slate-400 hover:border-blue-500 cursor-pointer"
                        >
                          이전
                        </button>
                      )}
                      {pageInfo.pageNumberList.map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`rounded-lg px-3 py-1 font-bold cursor-pointer ${
                            pageInfo.currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "border border-slate-700 text-slate-400 hover:border-blue-500"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                      {pageInfo.next && (
                        <button
                          onClick={() => handlePageChange(pageInfo.currentPage + 1)}
                          className="rounded-lg border border-slate-700 px-3 py-1 text-slate-400 hover:border-blue-500 cursor-pointer"
                        >
                          다음
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizListPage;