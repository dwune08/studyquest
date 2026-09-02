//export default function ItemManagement() {
  
  /*const quizzes = [
    {
      quizNo: 1,
      teacherNo: 10,
      quizType: 1, // 1: 객관식, 2: OX, 3: 단답형
      quizTitle: "2차 방정식의 해 구하기",
      quizQuestion: "다음 중 x^2 - 4 = 0 의 해로 올바른 것은?",
      quizAnswer: "2",
      choices: {
        choices1: "x = 1",
        choices2: "x = ±2",
        choices3: "x = 3",
        choices4: "x = 4",
        choices5: "해 없음",
      },
    },
    {
      quizNo: 2,
      teacherNo: 10,
      quizType: 2,
      quizTitle: "피타고라스 정리",
      quizQuestion: "직각삼각형에서 a^2 + b^2 = c^2 이 성립한다.",
      quizAnswer: "O",
      choices: {
        choices1: "O",
        choices2: "X",
        choices3: null,
        choices4: null,
        choices5: null,
      },
    },
  ];

  const getTypeName = (type) => {
    if (type === 1) return "5지선다";
    if (type === 2) return "O / X";
    return "단답형";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-gray-800 pb-4">
        <h3 className="font-bold text-gray-200 text-base">⚔️ QUIZ 테이블 등록 현황</h3>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-all cursor-pointer">
          + 새 퀴즈 출제
        </button>
      </div>

      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.quizNo}
            className="bg-[#0b101d] border border-gray-800 p-5 rounded-xl text-sm flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-cyan-400">QUIZ_NO #{quiz.quizNo}</span>
                <span className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs">
                  {getTypeName(quiz.quizType)}
                </span>
                <span className="font-bold text-gray-100 text-base">{quiz.quizTitle}</span>
              </div>
              <div className="flex gap-2 text-xs">
                <button className="px-3 py-1 bg-[#162032] border border-gray-700 text-gray-300 rounded hover:border-gray-500 cursor-pointer">
                  수정
                </button>
                <button className="px-3 py-1 bg-red-950/30 border border-red-800/50 text-red-400 rounded hover:bg-red-900/40 cursor-pointer">
                  삭제
                </button>
              </div>
            </div>

            <p className="text-gray-400 text-xs bg-[#050811] p-3 rounded-lg border border-gray-800/60">
              <strong className="text-gray-300">문제 (QUIZ_QUESTION):</strong> {quiz.quizQuestion}
            </p>

            {quiz.quizType === 1 && (
              <div className="grid grid-cols-5 gap-2 text-xs text-gray-400 pt-1">
                <span className={quiz.quizAnswer === "1" ? "text-cyan-400 font-bold" : ""}>1. {quiz.choices.choices1}</span>
                <span className={quiz.quizAnswer === "2" ? "text-cyan-400 font-bold" : ""}>2. {quiz.choices.choices2}</span>
                <span className={quiz.quizAnswer === "3" ? "text-cyan-400 font-bold" : ""}>3. {quiz.choices.choices3}</span>
                <span className={quiz.quizAnswer === "4" ? "text-cyan-400 font-bold" : ""}>4. {quiz.choices.choices4}</span>
                <span className={quiz.quizAnswer === "5" ? "text-cyan-400 font-bold" : ""}>5. {quiz.choices.choices5}</span>
              </div>
            )}

            <div className="text-xs text-right text-emerald-400 font-bold">
              정답 (QUIZ_ANSWER): {quiz.quizAnswer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}*/

import { useState } from "react";

const initialQuizzes = [
  {
    quizNo: 1,
    quizType: 0,
    quizTitle: "2차 방정식의 해 구하기",
    quizQuestion: "다음 중 x^2 - 4 = 0 의 해로 올바른 것은?",
    quizAnswer: "2",
    choices: [
      "x = 1",
      "x = ±2",
      "x = 3",
      "x = 4",
      "해 없음",
    ],
  },
  {
    quizNo: 2,
    quizType: 2,
    quizTitle: "피타고라스 정리",
    quizQuestion:
      "직각삼각형에서 a^2 + b^2 = c^2 이 성립한다.",
    quizAnswer: "O",
    choices: [],
  },
  {
    quizNo: 3,
    quizType: 1,
    quizTitle: "삼각비의 기본 개념",
    quizQuestion: "sin 30°의 값을 입력하세요.",
    quizAnswer: "1/2",
    choices: [],
  },
];

const typeName = (type) => {
  if (type === 0) return "5지선다";
  if (type === 1) return "단답형";
  return "O / X";
};

const ItemManagement = () => {
  const [quizzes, setQuizzes] = useState(initialQuizzes);
  const [editingQuiz, setEditingQuiz] = useState(null);

  const handleDelete = (quizNo) => {
    const result = window.confirm(
      `QUIZ #${quizNo}을 삭제하시겠습니까?`
    );

    if (!result) return;

    // 화면상에서만 삭제
    setQuizzes((prev) =>
      prev.filter((quiz) => quiz.quizNo !== quizNo)
    );
  };

  const handleEdit = (quiz) => {
    setEditingQuiz({ ...quiz });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingQuiz((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSave = () => {
    setQuizzes((prev) =>
      prev.map((quiz) =>
        quiz.quizNo === editingQuiz.quizNo
          ? editingQuiz
          : quiz
      )
    );

    setEditingQuiz(null);
  };

  return (
    <div>
      {/* 상단 */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-5">
        <div>
          <h2 className="text-lg font-bold">
            ⚔ QUIZ 테이블 등록 현황
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            내가 출제한 퀴즈를 관리합니다.
          </p>
        </div>

        <button
          type="button"
          className="
            rounded-lg
            bg-blue-600
            px-5
            py-2.5
            text-xs
            font-bold
            transition
            hover:bg-blue-500
          "
        >
          + 새 퀴즈 출제
        </button>
      </div>

      {/* 목록 */}
      <div className="mt-6 space-y-4">
        {quizzes.length === 0 && (
          <div className="rounded-xl border border-gray-800 bg-[#080d19] p-10 text-center text-sm text-gray-500">
            등록된 퀴즈가 없습니다.
          </div>
        )}

        {quizzes.map((quiz) => (
          <div
            key={quiz.quizNo}
            className="
              rounded-xl
              border
              border-gray-800
              bg-[#080d19]
              p-5
            "
          >
            {/* 제목 영역 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-bold text-cyan-400">
                  QUIZ_NO #{quiz.quizNo}
                </span>

                <span className="rounded bg-[#1e293b] px-2 py-1 text-[11px] text-gray-300">
                  {typeName(quiz.quizType)}
                </span>

                <span className="font-bold">
                  {quiz.quizTitle}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(quiz)}
                  className="
                    rounded
                    border
                    border-gray-600
                    px-3
                    py-1.5
                    text-xs
                    hover:bg-gray-800
                  "
                >
                  수정
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(quiz.quizNo)}
                  className="
                    rounded
                    border
                    border-red-900
                    bg-red-950/40
                    px-3
                    py-1.5
                    text-xs
                    text-red-400
                    hover:bg-red-950
                  "
                >
                  삭제
                </button>
              </div>
            </div>

            {/* 문제 */}
            <div className="mt-4 rounded-lg border border-gray-800 bg-[#050914] px-4 py-3 text-sm">
              <span className="font-bold">
                문제 (QUIZ_QUESTION):
              </span>{" "}
              <span className="text-gray-300">
                {quiz.quizQuestion}
              </span>
            </div>

            {/* 5지선다 */}
            {quiz.quizType === 0 && (
              <div className="mt-4 grid grid-cols-5 gap-3 text-xs text-gray-300">
                {quiz.choices.map((choice, index) => (
                  <div key={index}>
                    {index + 1}. {choice}
                  </div>
                ))}
              </div>
            )}

            {/* 단답형 */}
            {quiz.quizType === 1 && (
              <div className="mt-4 text-xs text-violet-300">
                단답형 문제
              </div>
            )}

            {/* O/X */}
            {quiz.quizType === 2 && (
              <div className="mt-4 text-xs text-blue-300">
                O / X 문제
              </div>
            )}

            <div className="mt-4 text-right text-xs font-bold text-emerald-400">
              정답 (QUIZ_ANSWER): {quiz.quizAnswer}
            </div>
          </div>
        ))}
      </div>

      {/* 수정 모달 */}
      {editingQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-xl rounded-2xl border border-blue-900/50 bg-[#0f172a] p-7 shadow-2xl">
            <h3 className="text-lg font-bold">
              QUIZ #{editingQuiz.quizNo} 수정
            </h3>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-xs text-gray-400">
                  퀴즈 제목
                </label>

                <input
                  name="quizTitle"
                  value={editingQuiz.quizTitle}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-gray-700 bg-[#070d19] px-4 py-3 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-gray-400">
                  문제
                </label>

                <textarea
                  name="quizQuestion"
                  value={editingQuiz.quizQuestion}
                  onChange={handleEditChange}
                  className="min-h-28 w-full rounded-lg border border-gray-700 bg-[#070d19] px-4 py-3 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-gray-400">
                  정답
                </label>

                <input
                  name="quizAnswer"
                  value={editingQuiz.quizAnswer}
                  onChange={handleEditChange}
                  className="w-full rounded-lg border border-gray-700 bg-[#070d19] px-4 py-3 outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingQuiz(null)}
                className="rounded-lg border border-gray-700 px-5 py-2 text-sm"
              >
                취소
              </button>

              <button
                type="button"
                onClick={handleEditSave}
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold"
              >
                수정 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemManagement;