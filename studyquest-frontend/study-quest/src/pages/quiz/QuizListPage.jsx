import { useEffect, useState } from "react";
import jwtAxios from "../../api/jwtAxios";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";
import BasicLayout from "../../layouts/BasicLayout";

const CATEGORIES = [
  { id: 0, name: "5지선다 퀴즈", desc: "객관식 문제를 풀고 포인트를 획득하세요", icon: "📝" },
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

      // 쿼리 파라미터 객체 생성 (type이 null이거나 undefined가 아닐 때만 포함)
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
      {/* max-w 및 pt/pb 패딩을 줄여 전체적인 화면 비율을 축소했습니다 */}
      <div className="min-h-[calc(100vh-80px)] w-full bg-[#020617] px-4 pt-8 sm:pt-12 pb-10 text-white flex flex-col justify-start items-center font-sans">
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-5">
          
          {/* 상단 Header (폰트 및 간격 축소) */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-black tracking-[0.15em] filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
              🗡️ STUDY:QUEST
            </h1>
            <p className="mt-1 text-[11px] sm:text-xs font-bold tracking-widest text-blue-400">QUIZ DUNGEON</p>
            <h2 className="mt-0.5 text-lg sm:text-xl font-bold text-slate-100">퀴즈 던전</h2>
          </div>

          {/* Main Content Box (컴팩트 패딩 적용) */}
          <div className="w-full rounded-2xl border border-slate-800/80 bg-[#0f1a2e]/90 p-5 sm:p-6 shadow-[0_0_30px_rgba(37,99,235,0.1)] backdrop-blur-sm">
            
            {/* 박스 내부 상단 컨트롤 헤더 */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-4">
              <div>
                <p className="text-[10px] font-semibold text-blue-400 tracking-wider">QUEST LIST</p>
                <h3 className="mt-0.5 text-lg sm:text-xl font-bold text-slate-100">
                  {selectedType === null
                    ? "도전할 퀴즈 카테고리를 선택하세요"
                    : `${getCategoryTitle(selectedType)} 목록`}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                {/* 카테고리 선택 상태일 때 '뒤로가기' 버튼 */}
                {selectedType !== null && (
                  <button
                    onClick={() => setSelectedType(null)}
                    className="rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:text-white cursor-pointer active:scale-95"
                  >
                    ← 카테고리 선택
                  </button>
                )}

                <button
                  onClick={goStudentMyPage}
                  className="rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-blue-500 hover:text-blue-300 cursor-pointer active:scale-95"
                >
                  마이페이지
                </button>
              </div>
            </div>

            {/* 1. 카테고리 미선택 시 : 3개 선택 카드 화면 */}
            {selectedType === null && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 py-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="flex flex-col items-center justify-between rounded-xl border border-slate-800 bg-[#081225]/80 p-6 min-h-[200px] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:bg-[#0c1933] hover:shadow-[0_8px_20px_rgba(37,99,235,0.15)] cursor-pointer group"
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110 filter drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]">
                        {cat.icon}
                      </span>
                      <h4 className="text-base font-bold text-slate-100 mb-1 group-hover:text-blue-300 transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <span className="mt-4 text-[11px] text-blue-400 font-bold tracking-wider group-hover:translate-x-1 transition-transform">
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

                    {/* 페이지네이션 (사이즈 축소) */}
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