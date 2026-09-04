import { useEffect, useState } from "react";
import jwtAxios from "../../api/jwtAxios";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";
import BasicLayout from "../../layouts/BasicLayout";

const CATEGORIES = [
  { id: 0, name: "5지선다 퀴즈", desc: "객관식 문제를 풀고 포인트를 획득하세요", icon: "📄" },
  { id: 1, name: "단답형 퀴즈", desc: "알맞은 답을 채워넣는 퀴즈입니다", icon: "✏️" },
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

      const params = {
        page: page,
        size: 5,
      };

      if (type !== null && type !== undefined && type !== "") {
        params.quizType = type;
      }

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
      {/* pb-24 및 min-h 조정을 통해 전체 컨텐츠를 시각적으로 살짝 위로 올렸습니다 */}
      <div className="min-h-[calc(100vh-140px)] w-full bg-[#020617] px-4 pt-4 pb-20 text-white flex flex-col justify-center items-center font-sans">
        
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-5">
          
          {/* 상단 Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">🗡️</span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-[0.15em] text-white">
                STUDY:QUEST
              </h1>
            </div>
            <p className="text-[11px] font-bold tracking-widest text-blue-400 uppercase">QUIZ DUNGEON</p>
            <h2 className="mt-1 text-lg sm:text-xl font-bold text-slate-100">퀴즈 던전</h2>
          </div>

          {/* Main Content Box */}
          <div className="w-full rounded-2xl border border-slate-800/80 bg-[#0c1629]/90 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md">
            
            {/* 박스 내부 상단 컨트롤 헤더 */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4">
              <div>
                <p className="text-[10px] font-bold tracking-wider text-blue-400">QUEST LIST</p>
                <h3 className="mt-0.5 text-base sm:text-lg font-bold text-slate-100">
                  {selectedType === null
                    ? "도전할 퀴즈 카테고리를 선택하세요"
                    : `${getCategoryTitle(selectedType)} 목록`}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                {selectedType !== null && (
                  <button
                    onClick={() => setSelectedType(null)}
                    className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:text-white cursor-pointer active:scale-95"
                  >
                    ← 카테고리 선택
                  </button>
                )}

                <button
                  onClick={goStudentMyPage}
                  className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-300 cursor-pointer active:scale-95"
                >
                  마이페이지
                </button>
              </div>
            </div>

            {/* 1. 카테고리 미선택 시 : 3개 선택 카드 화면 */}
            {selectedType === null && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="group flex flex-col items-center justify-between rounded-xl border border-slate-800 bg-[#081225]/80 p-5 min-h-[190px] transition-all duration-200 hover:border-blue-500/50 hover:bg-[#0c1a36] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] cursor-pointer text-center"
                  >
                    <div className="flex flex-col items-center w-full">
                      <span className="text-3xl my-2 transition-transform duration-300 group-hover:scale-110">
                        {cat.icon}
                      </span>
                      <h4 className="text-sm font-bold text-slate-100 mt-2 mb-1.5 group-hover:text-blue-300 transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed whitespace-nowrap">
                        {cat.desc}
                      </p>
                    </div>

                    <span className="mt-4 text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
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
                  <div className="py-12 text-center text-xs text-blue-400 font-medium">
                    퀴즈 목록을 불러오는 중입니다...
                  </div>
                )}
                {error && (
                  <div className="py-12 text-center text-xs text-rose-400 font-medium">
                    {error}
                  </div>
                )}

                {!loading && !error && (
                  <div className="flex flex-col gap-2.5">
                    {quizzes.length > 0 ? (
                      quizzes.map((quiz, index) => (
                        <button
                          key={quiz.quizNo || index}
                          onClick={() => goQuizDetail(quiz.quizNo)}
                          className="flex w-full items-center justify-between rounded-xl border border-slate-800/80 bg-[#081225]/90 px-4 py-3 transition-all duration-200 hover:border-blue-500/50 hover:bg-[#0c182e] hover:shadow-[0_0_12px_rgba(59,130,246,0.12)] cursor-pointer group text-left"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-[11px] font-black shadow-sm">
                              Q{(pageInfo.currentPage - 1) * 5 + index + 1}
                            </div>
                            <div className="truncate">
                              <p className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-blue-300 transition-colors truncate">
                                {quiz.quizTitle}
                              </p>
                            </div>
                          </div>

                          <span className="text-[11px] font-bold text-blue-400 shrink-0 ml-3 group-hover:translate-x-1 transition-transform">
                            도전하기 →
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="py-12 text-center text-xs text-slate-500">
                        등록된 {getCategoryTitle(selectedType)}를 모두 풀었습니다.
                      </div>
                    )}

                    {/* 페이지네이션 */}
                    {pageInfo.pageNumberList.length > 0 && (
                      <div className="mt-5 flex justify-center items-center gap-1.5 pt-1">
                        {pageInfo.prev && (
                          <button
                            onClick={() => handlePageChange(pageInfo.currentPage - 1)}
                            className="rounded-lg border border-slate-800 bg-[#081225] px-2.5 py-1 text-xs text-slate-400 hover:border-slate-600 hover:text-slate-200 transition cursor-pointer active:scale-95"
                          >
                            이전
                          </button>
                        )}
                        {pageInfo.pageNumberList.map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition cursor-pointer active:scale-95 ${
                              pageInfo.currentPage === pageNum
                                ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                                : "border border-slate-800 bg-[#081225] text-slate-400 hover:border-slate-600 hover:text-slate-200"
                            }`}
                          >
                            {pageNum}
                          </button>
                        ))}
                        {pageInfo.next && (
                          <button
                            onClick={() => handlePageChange(pageInfo.currentPage + 1)}
                            className="rounded-lg border border-slate-800 bg-[#081225] px-2.5 py-1 text-xs text-slate-400 hover:border-slate-600 hover:text-slate-200 transition cursor-pointer active:scale-95"
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
    </BasicLayout>
  );
};

export default QuizListPage;