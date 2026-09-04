import { useState, useEffect } from "react";
import jwtAxios from "../../api/jwtAxios"; // 경로 확인 필요

const typeName = (type) => {
  if (type === 0) return "5지선다";
  if (type === 1) return "단답형";
  if (type === 2) return "O / X";
};

const parseChoices = (quiz) => {
  if (Array.isArray(quiz.choices)) return quiz.choices;

  return [
    quiz.choice1 || "",
    quiz.choice2 || "",
    quiz.choice3 || "",
    quiz.choice4 || "",
    quiz.choice5 || "",
  ];
};

export default function ItemManagement() {
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. 퀴즈 목록 조회 (API 연동)
  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await jwtAxios.get("/quizzes");

      const data = response.data;
      let extractedList = [];

      if (Array.isArray(data)) {
        extractedList = data;
      } else if (data && Array.isArray(data.content)) {
        extractedList = data.content;
      } else if (data && Array.isArray(data.list)) {
        extractedList = data.list;
      } else if (data && Array.isArray(data.data)) {
        extractedList = data.data;
      } else if (data && typeof data === "object") {
        const arrayField = Object.values(data).find((val) => Array.isArray(val));
        extractedList = arrayField || [];
      }

      const refinedList = extractedList.map((quiz) => ({
        ...quiz,
        choices: parseChoices(quiz),
      }));

      setQuizzes(refinedList);
    } catch (error) {
      console.error("퀴즈 목록을 불러오는 데 실패했습니다:", error);
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // 2. 퀴즈 삭제 (API 연동)
  const handleDelete = async (quizNo) => {
    const result = window.confirm(`QUIZ #${quizNo}을 삭제하시겠습니까?`);
    if (!result) return;

    try {
      await jwtAxios.delete(`/quizzes/${quizNo}`);
      setQuizzes((prev) => prev.filter((quiz) => quiz.quizNo !== quizNo));
      alert("삭제되었습니다.");
    } catch (error) {
      console.error("퀴즈 삭제 실패:", error);
      alert(error.response?.data?.message || "퀴즈 삭제에 실패했습니다.");
    }
  };

  const handleEdit = (quiz) => {
    let convertedAnswer = quiz.quizAnswer;

    if (quiz.quizType === 2) {
      const val = String(quiz.quizAnswer).toUpperCase();
      if (val === "1") {
        convertedAnswer = "O";
      } else if (val === "2") {
        convertedAnswer = "X";
      }
    }

    setEditingQuiz({
      ...quiz,
      quizAnswer: convertedAnswer,
      choices: parseChoices(quiz),
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingQuiz((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChoiceChange = (index, value) => {
    setEditingQuiz((prev) => {
      const newChoices = [...prev.choices];
      newChoices[index] = value;
      return { ...prev, choices: newChoices };
    });
  };

  // 3. 퀴즈 수정 저장 (API 연동)
  const handleEditSave = async () => {
    try {
      let formattedAnswer = editingQuiz.quizAnswer;

      if (Number(editingQuiz.quizType) === 2) {
        if (editingQuiz.quizAnswer === "O" || editingQuiz.quizAnswer === "1")
          formattedAnswer = "1";
        if (editingQuiz.quizAnswer === "X" || editingQuiz.quizAnswer === "2")
          formattedAnswer = "2";
      }

      const payload = {
        quizNo: editingQuiz.quizNo,
        teacherNo: editingQuiz.teacherNo,
        quizTitle: editingQuiz.quizTitle,
        quizType: editingQuiz.quizType,
        quizQuestion: editingQuiz.quizQuestion,
        quizAnswer: formattedAnswer,
        choice1: editingQuiz.choice1,
        choice2: editingQuiz.choice2,
        choice3: editingQuiz.choice3,
        choice4: editingQuiz.choice4,
        choice5: editingQuiz.choice5,
      };

      await jwtAxios.patch(`/quizzes/${editingQuiz.quizNo}`, payload);

      setQuizzes((prev) =>
        prev.map((quiz) =>
          quiz.quizNo === editingQuiz.quizNo
            ? { ...editingQuiz, quizAnswer: formattedAnswer }
            : quiz
        )
      );
      setEditingQuiz(null);
      alert("수정되었습니다.");
    } catch (error) {
      console.error("퀴즈 수정 실패:", error);
      alert(error.response?.data?.message || "퀴즈 수정에 실패했습니다.");
    }
  };

  return (
    <div>
      {/* [학생 관리] 이미지와 동일한 초슬림 다크 스크롤바 */}
      <style>{`
        ::-webkit-scrollbar {
          width: 5px !important;
          height: 5px !important;
        }
        ::-webkit-scrollbar-track {
          background: transparent !important;
        }
        ::-webkit-scrollbar-thumb {
          background: #1f293d !important;
          border-radius: 9999px !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #3b82f6 !important;
        }
      `}</style>

      {/* 상단 */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-5">
        <div>
          <h2 className="text-lg font-bold">⚔ QUIZ 테이블 등록 현황</h2>
          <p className="mt-1 text-xs text-gray-500">
            내가 출제한 퀴즈를 관리합니다.
          </p>
        </div>
      </div>

      {/* 목록 */}
      <div className="mt-6 space-y-4">
        {loading && (
          <div className="rounded-xl border border-gray-800 bg-[#080d19] p-10 text-center text-sm text-gray-400">
            데이터를 불러오는 중입니다...
          </div>
        )}

        {!loading && (!Array.isArray(quizzes) || quizzes.length === 0) && (
          <div className="rounded-xl border border-gray-800 bg-[#080d19] p-10 text-center text-sm text-gray-500">
            등록된 퀴즈가 없습니다.
          </div>
        )}

        {!loading &&
          Array.isArray(quizzes) &&
          quizzes.map((quiz, idx) => (
            <div
              key={quiz.quizNo || idx}
              className="rounded-xl border border-gray-800 bg-[#080d19] p-5"
            >
              {/* 제목 영역 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-cyan-400">
                    QUIZ_NO #{quiz.quizNo || "N/A"}
                  </span>

                  <span className="rounded bg-[#1e293b] px-2 py-1 text-[11px] text-gray-300">
                    {typeName(quiz.quizType)}
                  </span>

                  <span className="font-bold">
                    {quiz.quizTitle || "제목 없음"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(quiz)}
                    className="rounded border border-gray-600 px-3 py-1.5 text-xs hover:bg-gray-800 cursor-pointer"
                  >
                    수정
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(quiz.quizNo)}
                    className="rounded border border-red-900 bg-red-950/40 px-3 py-1.5 text-xs text-red-400 hover:bg-red-950 cursor-pointer"
                  >
                    삭제
                  </button>
                </div>
              </div>

              {/* 문제 */}
              <div className="mt-4 rounded-lg border border-gray-800 bg-[#050914] px-4 py-3 text-sm">
                <span className="font-bold">문제 (QUIZ_QUESTION):</span>{" "}
                <span className="text-gray-300">
                  {quiz.quizQuestion || "내용 없음"}
                </span>
              </div>

              {/* 5지선다 */}
              {quiz.quizType === 0 && (
                <div className="mt-4 text-xs text-violet-300">
                  오지선다형 문제
                </div>
              )}

              {/* 단답형 */}
              {quiz.quizType === 1 && (
                <div className="mt-4 text-xs text-violet-300">단답형 문제</div>
              )}

              {/* O/X */}
              {quiz.quizType === 2 && (
                <div className="mt-4 text-xs text-blue-300">O / X 문제</div>
              )}

              <div className="mt-4 text-right text-xs font-bold text-emerald-400">
                정답 (QUIZ_ANSWER): {quiz.quizAnswer || "미지정"}
              </div>
            </div>
          ))}
      </div>

      {/* 수정 모달 */}
      {editingQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-y-auto py-10">
          <div className="w-full max-w-xl rounded-2xl border border-blue-900/50 bg-[#0f172a] p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold">
              QUIZ #{editingQuiz.quizNo} 수정 ({typeName(editingQuiz.quizType)})
            </h3>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-xs text-gray-400">
                  퀴즈 제목
                </label>
                <input
                  name="quizTitle"
                  value={editingQuiz.quizTitle || ""}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-gray-700 bg-[#070d19] px-4 py-3 outline-none focus:border-cyan-500 text-sm"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-gray-400">
                  문제 내용
                </label>
                <textarea
                  name="quizQuestion"
                  value={editingQuiz.quizQuestion || ""}
                  onChange={handleEditChange}
                  className="min-h-24 w-full rounded-lg border border-gray-700 bg-[#070d19] px-4 py-3 outline-none focus:border-cyan-500 text-sm"
                />
              </div>

              {/* 5지선다일 경우 보기(choices) 편집 영역 노출 */}
              {editingQuiz.quizType === 0 && (
                <div>
                  <label className="mb-2 block text-xs text-gray-400">
                    선택지 (1번 ~ 5번 보기)
                  </label>
                  <div className="space-y-2">
                    {editingQuiz.choices?.map((choice, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-cyan-400 w-6">
                          {index + 1}.
                        </span>
                        <input
                          type="text"
                          value={choice || ""}
                          onChange={(e) =>
                            handleChoiceChange(index, e.target.value)
                          }
                          className="w-full rounded-lg border border-gray-700 bg-[#070d19] px-3 py-2 outline-none focus:border-cyan-500 text-xs"
                          placeholder={`${index + 1}번 보기 입력`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 정답 영역 */}
              <div>
                <label className="mb-2 block text-xs text-gray-400">
                  정답 (QUIZ_ANSWER)
                </label>

                {editingQuiz.quizType === 2 ? (
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingQuiz((prev) => ({ ...prev, quizAnswer: "O" }))
                      }
                      className={`flex-1 py-3 rounded-lg border text-sm font-bold transition cursor-pointer ${
                        editingQuiz.quizAnswer === "O"
                          ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40"
                          : "bg-[#070d19] border-gray-700 text-gray-400 hover:bg-gray-800"
                      }`}
                    >
                      O (참)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingQuiz((prev) => ({ ...prev, quizAnswer: "X" }))
                      }
                      className={`flex-1 py-3 rounded-lg border text-sm font-bold transition cursor-pointer ${
                        editingQuiz.quizAnswer === "X"
                          ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/40"
                          : "bg-[#070d19] border-gray-700 text-gray-400 hover:bg-gray-800"
                      }`}
                    >
                      X (거짓)
                    </button>
                  </div>
                ) : (
                  <input
                    name="quizAnswer"
                    value={editingQuiz.quizAnswer || ""}
                    onChange={handleEditChange}
                    placeholder={
                      editingQuiz.quizType === 0
                        ? "정답 번호 입력 (예: 1)"
                        : "정답 입력"
                    }
                    className="w-full rounded-lg border border-gray-700 bg-[#070d19] px-4 py-3 outline-none focus:border-cyan-500 text-sm"
                  />
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingQuiz(null)}
                className="rounded-lg border border-gray-700 px-5 py-2 text-sm cursor-pointer hover:bg-gray-800"
              >
                취소
              </button>

              <button
                type="button"
                onClick={handleEditSave}
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold cursor-pointer hover:bg-blue-500"
              >
                수정 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}