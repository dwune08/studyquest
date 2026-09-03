import { useState } from "react";
import jwtAxios from "../../api/jwtAxios";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";
import { useAuth } from "../../hooks/useAuth";

const QuizRegisterComponent = () => {
  const { goQuizList } = useCustomNavigate();
  const { teacherNo, currentNo } = useAuth();

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

    // 4. 전송 전 teacherNo 유효성 검사 추가 (값이 없으면 에러 방지 및 알림)
    if (!teacherNo) {
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
      teacherNo: Number(teacherNo), // 확실하게 숫자로 변환하여 전송
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
        goQuizList();
      }
    } catch (error) {
      console.error("퀴즈 등록 실패:", error);
      alert("퀴즈 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-full h-full text-white flex items-center justify-center p-4">
      {/* number 인풋 화살표 제거 스타일 추가 */}
      <style>{`
        /* Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

      <main className="w-full max-w-2xl mx-auto flex flex-col space-y-4">
        <form onSubmit={submitQuiz} className="flex flex-col space-y-4">
          
          {/* 1. 퀴즈 기본 정보 */}
          <section className="rounded-2xl border border-slate-700 bg-[#0d172a] p-6 shadow-xl">
            <p className="mb-1 text-xs text-blue-400 font-semibold tracking-wider">
              QUIZ INFORMATION
            </p>
            <h2 className="mb-4 text-xl font-bold">퀴즈 기본 정보</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-sky-300 font-medium">
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
                <label className="mb-2 block text-sm text-slate-400 font-medium">
                  유형
                </label>
                <select
                  name="quizType"
                  value={form.quizType}
                  onChange={changeQuizType}
                  className="w-full rounded-xl border border-slate-700 bg-[#071023] px-4 py-3 text-white outline-none focus:border-blue-500"
                >
                  <option value={0}>5지선다 - 공격력</option>
                  <option value={1}>빈칸 - 지혜</option>
                  <option value={2}>O/X - 스피드</option>
                </select>
              </div>
            </div>
          </section>

          {/* 2. 문제 작성 */}
          <section className="h-[440px] flex flex-col justify-between rounded-2xl border border-slate-700 bg-[#0d172a] p-6 shadow-xl">
            <div>
              <p className="mb-1 text-xs text-blue-400 font-semibold tracking-wider">
                QUESTION #1
              </p>
              <h2 className="mb-2 text-xl font-bold">문제 작성</h2>

              <textarea
                name="quizQuestion"
                value={form.quizQuestion}
                onChange={changeForm}
                placeholder="문제를 입력하세요."
                rows={form.quizType === 0 ? 2 : 3}
                className="w-full rounded-xl border border-slate-700 bg-[#071023] p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 resize-none"
              />
            </div>

            {/* 0 : 5지선다 */}
            {form.quizType === 0 && (
              <div>
                <p className="mb-4 text-sm font-bold text-blue-400">
                  5지선다 선택지
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    "choice1",
                    "choice2",
                    "choice3",
                    "choice4",
                    "choice5",
                  ].map((name, index) => (
                    <input
                      key={name}
                      name={name}
                      value={form[name]}
                      onChange={changeForm}
                      placeholder={`${index + 1}번 선택지`}
                      maxLength={300}
                      className="rounded-xl border border-slate-700 bg-[#071023] px-4 py-3 outline-none focus:border-blue-500"
                    />
                  ))}
                </div>

                <div>
                  <label className="mb-1 block text-xs text-slate-400 font-medium">
                    정답 선택
                  </label>
                  <select
                    name="quizAnswer"
                    value={form.quizAnswer}
                    onChange={changeForm}
                    className="w-full rounded-xl border border-slate-700 bg-[#071023] px-3.5 py-2 text-sm text-white outline-none focus:border-blue-500"
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
            {form.quizType === 1 && (
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
            {form.quizType === 2 && (
              <div>
                <p className="mb-4 text-sm font-bold text-cyan-400">
                  ⚡ O / X 문제
                </p>
                <p className="mb-3 text-sm text-slate-400">
                  문제의 정답을 선택하세요. (O=1, X=2)
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        quizAnswer: "O",
                      }))
                    }
                    className={`rounded-2xl border py-10 text-5xl font-black transition ${
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
                      setForm((prev) => ({
                        ...prev,
                        quizAnswer: "X",
                      }))
                    }
                    className={`rounded-2xl border py-10 text-5xl font-black transition ${
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

          {/* 3. 등록 버튼 */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 text-lg font-bold shadow-lg transition hover:brightness-110"
          >
            ⚔ 퀴즈 등록하기
          </button>
        </form>
      </main>
    </div>
  );
};

export default QuizRegisterComponent;