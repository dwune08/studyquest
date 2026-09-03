import { useState } from "react";
import jwtAxios from "../../api/jwtAxios";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const QuizRegisterComponent = () => {
  const { goQuizList } = useCustomNavigate();
  const { teacherNo, currentNo } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    quizTitle: "",
    quizType: 0,
    quizQuestion: "",
    quizAnswer: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    choice5: "",
  });

  const changeForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ★ 수정: e.target.value(string)와 form.quizType(number) 비교 타입 일치 처리
  const changeQuizType = (e) => {
    const newQuizType = Number(e.target.value);
    
    // 이미 같은 유형이라면 리셋하지 않음
    if (Number(form.quizType) === newQuizType) return;

    setForm((prev) => ({
      ...prev,
      quizType: newQuizType,
      quizAnswer: "",
      choice1: "",
      choice2: "",
      choice3: "",
      choice4: "",
      choice5: "",
    }));
  };

  const submitQuiz = async (e) => {
    e.preventDefault();

    const targetTeacherNo = teacherNo || currentNo;
    if (!targetTeacherNo) {
      alert("로그인 정보(교사 번호)를 찾을 수 없습니다. 다시 로그인해 주세요.");
      return;
    }

    if (!form.quizTitle.trim()) {
      alert("퀴즈 제목을 입력해주세요.");
      return;
    }
    if (!form.quizQuestion.trim()) {
      alert("문제를 입력해주세요.");
      return;
    }

    // 5지선다 유효성 검사
    if (Number(form.quizType) === 0) {
      if (
        !form.choice1.trim() ||
        !form.choice2.trim() ||
        !form.choice3.trim() ||
        !form.choice4.trim() ||
        !form.choice5.trim()
      ) {
        alert("5지선다 보기(1번~5번 선택지)를 모두 입력해 주세요.");
        return;
      }
    }

    if (form.quizAnswer === "" || form.quizAnswer === null) {
      alert("정답을 입력/선택해주세요.");
      return;
    }

    let formattedAnswer = null;
    const currentType = Number(form.quizType);

    if (currentType === 0) {
      formattedAnswer = Number(form.quizAnswer);
    } else if (currentType === 2) {
      formattedAnswer = form.quizAnswer === "O" ? 1 : 2;
    } else if (currentType === 1) {
      formattedAnswer = Number(form.quizAnswer);
    }

    const payload = {
      teacherNo: Number(targetTeacherNo),
      quizTitle: form.quizTitle,
      quizType: currentType,
      quizQuestion: form.quizQuestion,
      quizAnswer: formattedAnswer,
      choice1: currentType === 0 ? form.choice1 : null,
      choice2: currentType === 0 ? form.choice2 : null,
      choice3: currentType === 0 ? form.choice3 : null,
      choice4: currentType === 0 ? form.choice4 : null,
      choice5: currentType === 0 ? form.choice5 : null,
    };

    // F12 개발자 도구 콘솔에서 payload 값 확인용
    console.log("전송 데이터 Payload:", payload);

    try {
      const response = await jwtAxios.post("/quizzes", payload);

      if (response.status === 200 || response.status === 201) {
        alert("퀴즈가 성공적으로 등록되었습니다!");
        navigate("/teacher", {
  state: {
    activeMenu: "quizzes",
  },
});
      }
    } catch (error) {
      console.error("퀴즈 등록 실패:", error);
      alert("퀴즈 등록 중 오류가 발생했습니다.");
    }
  };


  return (
    <div className="min-h-screen overflow-y-auto bg-[#020817] pb-32 text-white">
      <main className="mx-auto w-full max-w-5xl px-6 pt-16 pb-12">
        <form onSubmit={submitQuiz} className="mx-auto max-w-3xl space-y-7">
          {/* 퀴즈 기본 정보 */}
          <section className="rounded-2xl border border-slate-700 bg-[#0d172a] p-8">
            <p className="mb-2 text-xs text-blue-400">QUIZ INFORMATION</p>
            <h2 className="mb-7 text-2xl font-bold">퀴즈 기본 정보</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-sm text-sky-300">
                  퀴즈 제목
                </label>
                <input
                  type="text"
                  name="quizTitle"
                  value={form.quizTitle}
                  onChange={changeForm}
                  placeholder="퀴즈 제목을 입력하세요."
                  maxLength={30}
                  className="w-full rounded-xl border border-slate-700 bg-[#071023] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  유형
                </label>
                <select
                  name="quizType"
                  value={form.quizType}
                  onChange={changeQuizType}
                  className="w-full rounded-xl border border-slate-700 bg-[#071023] px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value={0}>5지선다 - 공격력</option>
                  <option value={1}>빈칸 - 지혜</option>
                  <option value={2}>O/X - 스피드</option>
                </select>
              </div>
            </div>
          </section>

          {/* 문제 작성 */}
          <section className="rounded-2xl border border-slate-700 bg-[#0d172a] p-8">
            <p className="text-xs text-blue-400">QUESTION #1</p>
            <h2 className="mb-6 text-xl font-bold">문제 작성</h2>

            <textarea
              name="quizQuestion"
              value={form.quizQuestion}
              onChange={changeForm}
              placeholder="문제를 입력하세요."
              className="mb-7 min-h-28 w-full rounded-xl border border-slate-700 bg-[#071023] p-4 outline-none focus:border-blue-500"
            />

            {/* 0 : 5지선다 */}
            {Number(form.quizType) === 0 && (
              <div>
                <p className="mb-4 text-sm font-bold text-blue-400">
                  5지선다 선택지
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    type="text"
                    name="choice1"
                    value={form.choice1}
                    onChange={changeForm}
                    placeholder="1번 선택지"
                    maxLength={300}
                    className="rounded-xl border border-slate-700 bg-[#071023] px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="choice2"
                    value={form.choice2}
                    onChange={changeForm}
                    placeholder="2번 선택지"
                    maxLength={300}
                    className="rounded-xl border border-slate-700 bg-[#071023] px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="choice3"
                    value={form.choice3}
                    onChange={changeForm}
                    placeholder="3번 선택지"
                    maxLength={300}
                    className="rounded-xl border border-slate-700 bg-[#071023] px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="choice4"
                    value={form.choice4}
                    onChange={changeForm}
                    placeholder="4번 선택지"
                    maxLength={300}
                    className="rounded-xl border border-slate-700 bg-[#071023] px-4 py-3 outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name="choice5"
                    value={form.choice5}
                    onChange={changeForm}
                    placeholder="5번 선택지"
                    maxLength={300}
                    className="rounded-xl border border-slate-700 bg-[#071023] px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm text-slate-400">
                    정답 선택
                  </label>
                  <select
                    name="quizAnswer"
                    value={form.quizAnswer}
                    onChange={changeForm}
                    className="w-full rounded-xl border border-slate-700 bg-[#071023] px-4 py-3"
                  >
                    <option value="">정답 번호를 선택하세요.</option>
                    <option value="1">1번</option>
                    <option value="2">2번</option>
                    <option value="3">3번</option>
                    <option value="4">4번</option>
                    <option value="5">5번</option>
                  </select>
                </div>
              </div>
            )}

            {/* 1 : 단답형/빈칸 */}
            {Number(form.quizType) === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-bold text-violet-400">
                    정답 입력 (숫자)
                  </label>
                  <input
                    type="number"
                    name="quizAnswer"
                    value={form.quizAnswer}
                    onChange={changeForm}
                    placeholder="정답 숫자를 입력하세요."
                    className="w-full rounded-xl border border-slate-700 bg-[#071023] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-violet-500"
                  />
                </div>
              </div>
            )}

            {/* 2 : O/X */}
            {Number(form.quizType) === 2 && (
              <div>
                <p className="mb-4 text-sm font-bold text-cyan-400">
                  ⚡ O / X 문제
                </p>
                <p className="mb-5 text-sm text-slate-400">
                  문제의 정답을 선택하세요. (O=1, X=2)
                </p>

                <div className="grid grid-cols-2 gap-5">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, quizAnswer: "O" }))
                    }
                    className={`rounded-2xl border py-10 text-5xl font-black transition cursor-pointer ${
                      form.quizAnswer === "O"
                        ? "border-blue-500 bg-blue-500/20 text-blue-400"
                        : "border-slate-700 bg-[#071023] text-slate-400 hover:border-blue-500"
                    }`}
                  >
                    O
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, quizAnswer: "X" }))
                    }
                    className={`rounded-2xl border py-10 text-5xl font-black transition cursor-pointer ${
                      form.quizAnswer === "X"
                        ? "border-red-500 bg-red-500/20 text-red-400"
                        : "border-slate-700 bg-[#071023] text-slate-400 hover:border-red-500"
                    }`}
                  >
                    X
                  </button>
                </div>
              </div>
            )}
          </section>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 text-lg font-bold shadow-lg transition hover:brightness-110 cursor-pointer"
          >
            ⚔ 퀴즈 등록하기
          </button>
        </form>
      </main>
    </div>
  );
};

export default QuizRegisterComponent;