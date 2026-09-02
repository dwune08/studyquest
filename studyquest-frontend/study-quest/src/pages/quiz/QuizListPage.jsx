import { useEffect, useState } from "react";
import jwtAxios from "../../api/jwtAxios";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";
import BasicLayout from "../../layouts/BasicLayout";

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

      // 쿼리 파라미터 객체 생성 (type이 null이거나 undefined가 아닐 때만 포함)
      const params = {
        page: page,
        size: 5,
      };

      if (type !== null && type !== undefined && type !== "") {
        params.quizType = type;
      }

      // jwtAxios의 params 옵션을 활용하면 null 파라미터 문제를 방지할 수 있습니다.
      const res = await jwtAxios.get("/quizzes", { params });
      
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
    <BasicLayout>
      <div className="w-full max-w-6xl mx-auto px-6 py-6 text-white flex flex-col justify-start">
        
        {/* 상단 Header */}
        <div className="mb-8 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs font-bold text-blue-300 tracking-wider mb-2.5 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
            ⚔️ QUEST LOG: QUIZ DUNGEON
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
            퀴즈 던전 입장
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            원하는 던전 유형을 선택하고 퀴즈를 풀어 스탯을 올리세요!
          </p>
        </div>

        {/* Main Content Box - 너비 및 내부 여백 확장 */}
        <div className="rounded-3xl border border-slate-800 bg-[#0f1a2e]/90 p-8 sm:p-10 shadow-[0_0_40px_rgba(37,99,235,0.1)] backdrop-blur-sm">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-blue-400">QUEST LIST</p>
              <h3 className="mt-1 text-xl sm:text-2xl font-bold text-slate-100">
                {selectedType === null
                  ? "도전할 퀴즈 카테고리를 선택하세요"
                  : `${getCategoryTitle(selectedType)} 목록`}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {/* 카테고리 선택 상태일 때 '뒤로가기' 버튼 */}
              {selectedType !== null && (
                <button
                  type="button"
                  onClick={() => setSelectedType(null)}
                  className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-white cursor-pointer active:scale-95"
                >
                  ← 카테고리 선택
                </button>
              )}

              <button
                type="button"
                onClick={goStudentMyPage}
                className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-white cursor-pointer active:scale-95"
              >
                마이페이지
              </button>
            </div>
          </div>

          {/* 1. 카테고리 미선택 시 : 3개 선택 카드 */}
          {selectedType === null && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 py-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-[#081225]/80 p-8 sm:p-10 transition-all hover:-translate-y-1 hover:border-blue-500/50 hover:bg-[#0b1730] shadow-md cursor-pointer group"
                >
                  <span className="text-5xl mb-5 transition transform group-hover:scale-105">
                    {cat.icon}
                  </span>
                  <h4 className="text-lg font-bold text-slate-100 mb-2">{cat.name}</h4>
                  <p className="text-xs text-slate-400 text-center leading-relaxed">{cat.desc}</p>
                  <span className="mt-6 text-xs text-blue-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    입장하기 →
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* 2. 카테고리 선택 시 : 목록 및 페이징 UI */}
          {selectedType !== null && (
            <>
              {loading && (
                <div className="py-16 text-center text-xs text-blue-400 animate-pulse">
                  퀴즈 목록을 불러오는 중입니다...
                </div>
              )}
              
              {error && (
                <div className="py-16 text-center text-xs text-rose-400">
                  {error}
                </div>
              )}

              {!loading && !error && (
                <div className="space-y-3.5 py-2">
                  {quizzes.length > 0 ? (
                    quizzes.map((quiz, index) => (
                      <button
                        key={quiz.quizNo || index}
                        type="button"
                        onClick={() => goQuizDetail(quiz.quizNo)}
                        className="flex w-full items-center justify-between rounded-xl border border-slate-800/80 bg-[#081225]/80 px-6 py-4 text-left transition-all hover:border-blue-500/40 hover:bg-[#0b1730] cursor-pointer group shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-extrabold text-white shadow-sm">
                            Q{(pageInfo.currentPage - 1) * 5 + index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-200 group-hover:text-blue-300 transition-colors">
                              {quiz.quizTitle}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                          도전하기 →
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="py-16 text-center text-xs text-slate-500">
                      등록된 {getCategoryTitle(selectedType)}가 없습니다.
                    </div>
                  )}

                  {/* 페이지네이션 (5개 단위) */}
                  {pageInfo.pageNumberList.length > 0 && (
                    <div className="mt-8 flex justify-center gap-2 pt-3">
                      {pageInfo.prev && (
                        <button
                          type="button"
                          onClick={() => handlePageChange(pageInfo.currentPage - 1)}
                          className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 hover:border-blue-500 hover:text-white cursor-pointer"
                        >
                          이전
                        </button>
                      )}
                      {pageInfo.pageNumberList.map((pageNum) => (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                            pageInfo.currentPage === pageNum
                              ? "bg-blue-600 text-white shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                              : "border border-slate-800 bg-slate-900 text-slate-400 hover:border-blue-500 hover:text-white"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                      {pageInfo.next && (
                        <button
                          type="button"
                          onClick={() => handlePageChange(pageInfo.currentPage + 1)}
                          className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 hover:border-blue-500 hover:text-white cursor-pointer"
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
    </BasicLayout>
  );
};

export default QuizListPage;