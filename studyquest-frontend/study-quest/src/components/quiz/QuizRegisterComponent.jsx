import { useState } from "react";
import { useSelector } from "react-redux";

const QuizRegisterComponent = () => {

    const loginState = useSelector((state) => state.loginSlice);

    /*
     * 로그인한 교사의 담당 학년.
     *
     * loginSlice에 teacherGrade가 있으면 그것을 사용.
     * 아직 Redux에 없다면 우선 1학년으로 표시.
     */
    const loginGrade = loginState?.teacherGrade ?? 1;


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

        const {
            name,
            value
        } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    /*
     * 퀴즈 유형 변경
     *
     * 0 = 5지선다
     * 1 = 빈칸
     * 2 = O/X
     */
    const changeQuizType = (e) => {

        const quizType = Number(e.target.value);

        setForm((prev) => ({
            ...prev,

            quizType,

            /*
             * 유형을 변경하면 이전 유형에서
             * 선택했던 정답/선택지 제거
             */
            quizAnswer: "",

            choice1: "",
            choice2: "",
            choice3: "",
            choice4: "",
            choice5: "",
        }));
    };


    const submitQuiz = (e) => {

        e.preventDefault();

        console.log(
            "퀴즈 등록 데이터:",
            form
        );

        /*
         * 다음 단계에서 기존 quizApi.js의
         * 등록 API를 이곳에 연결하면 됨.
         */
    };


    return (

        /*
         * overflow-y-auto
         * pb-32
         *
         * → 아래쪽 버튼이 잘리는 현상 방지
         */
        <div className="min-h-screen overflow-y-auto bg-[#020817] pb-32 text-white">

    <main className="mx-auto w-full max-w-5xl px-6 pt-16 pb-12">

        <form
            onSubmit={submitQuiz}
            className="mx-auto max-w-3xl space-y-7">

                    {/* ============================= */}
                    {/* 퀴즈 기본 정보 */}
                    {/* ============================= */}

                    <section className="rounded-2xl border border-slate-700 bg-[#0d172a] p-8">

                        <p className="mb-2 text-xs text-blue-400">
                            QUIZ INFORMATION
                        </p>

                        <h2 className="mb-7 text-2xl font-bold">
                            퀴즈 기본 정보
                        </h2>


                       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* 퀴즈 제목 */}
                        <div>
                            <label className="block mb-2 text-sm text-sky-300">
                                퀴즈 제목
                            </label>
                            
                            <input
                            type="text" name="quizTitle" value={form.quizTitle} onChange={changeForm}
                            placeholder="퀴즈 제목을 입력하세요." maxLength={30} 
                            className="w-full rounded-xl border border-slate-700 bg-[#071023] px-4 py-3 
                            text-white outline-none placeholder:text-slate-500 focus:border-blue-500"/>
                            </div>


                            {/* 문제 유형 */}

                            <div>

                                <label className="mb-2 block text-sm text-slate-400">
                                    유형
                                </label>

                                <select
                                    name="quizType"
                                    value={form.quizType}
                                    onChange={changeQuizType}
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-slate-700
                                        bg-[#071023]
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-blue-500">

                                    <option value={0}>
                                        5지선다 - 공격력
                                    </option>

                                    <option value={1}>
                                        빈칸 - 지혜
                                    </option>

                                    <option value={2}>
                                        O/X - 스피드
                                    </option>

                                </select>

                            </div>

                        </div>

                    </section>


                    {/* ============================= */}
                    {/* 문제 작성 */}
                    {/* ============================= */}

                    <section className="rounded-2xl border border-slate-700 bg-[#0d172a] p-8">

                        <p className="text-xs text-blue-400">
                            QUESTION #1
                        </p>

                        <h2 className="mb-6 text-xl font-bold">
                            문제 작성
                        </h2>


                        {/* 문제 */}

                        <textarea
                            name="quizQuestion"
                            value={form.quizQuestion}
                            onChange={changeForm}
                            placeholder="문제를 입력하세요."
                            className="
                                mb-7
                                min-h-28
                                w-full
                                rounded-xl
                                border
                                border-slate-700
                                bg-[#071023]
                                p-4
                                outline-none
                                focus:border-blue-500"/>


                        {/* ============================= */}
                        {/* 0 : 5지선다 */}
                        {/* ============================= */}

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
                                        "choice5"
                                    ].map((name, index) => (

                                        <input
                                            key={name}
                                            name={name}
                                            value={form[name]}
                                            onChange={changeForm}
                                            placeholder={`${index + 1}번 선택지`}
                                            maxLength={300}
                                            className="
                                                rounded-xl
                                                border
                                                border-slate-700
                                                bg-[#071023]
                                                px-4
                                                py-3
                                                outline-none
                                                focus:border-blue-500
                                            "
                                        />

                                    ))}

                                </div>


                                <div className="mt-6">

                                    <label className="mb-2 block text-sm text-slate-400">
                                        정답 선택
                                    </label>

                                    <select
                                        name="quizAnswer"
                                        value={form.quizAnswer}
                                        onChange={changeForm}
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-slate-700
                                            bg-[#071023]
                                            px-4
                                            py-3">

                                        <option value="">
                                            정답 번호를 선택하세요.
                                        </option>

                                        <option value="1">
                                            1번
                                        </option>

                                        <option value="2">
                                            2번
                                        </option>

                                        <option value="3">
                                            3번
                                        </option>

                                        <option value="4">
                                            4번
                                        </option>

                                        <option value="5">
                                            5번
                                        </option>

                                    </select>

                                </div>

                            </div>

                        )}


                        {/* ============================= */}
                        {/* 1 : 빈칸 문제 */}
                        {/* ============================= */}

                        {/* 빈칸 - 지혜 */}
{/* 1 : 단답형 - 지혜 */}
{form.quizType === 1 && (
    <div className="space-y-6">

        <div>
            <label className="mb-2 block text-sm font-bold text-violet-400">
                정답 입력
            </label>

            <input
                type="text"
                name="quizAnswer"
                value={form.quizAnswer}
                onChange={changeForm}
                placeholder="정답을 입력하세요."
                maxLength={300}
                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-[#071023]
                    px-4
                    py-3
                    text-white
                    outline-none
                    placeholder:text-slate-500
                    focus:border-violet-500
                "
            />
        </div>

    </div>
)}


                        {/* ============================= */}
                        {/* 2 : O/X 문제 */}
                        {/* ============================= */}

                        {form.quizType === 2 && (

                            <div>

                                <p className="mb-4 text-sm font-bold text-cyan-400">
                                    ⚡ O / X 문제
                                </p>

                                <p className="mb-5 text-sm text-slate-400">
                                    문제의 정답을 선택하세요.
                                </p>


                                <div className="grid grid-cols-2 gap-5">

                                    {/* O */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({
                                                ...prev,
                                                quizAnswer: "O",
                                            }))
                                        }
                                        className={`
                                            rounded-2xl
                                            border
                                            py-10
                                            text-5xl
                                            font-black
                                            transition
                                            ${
                                                form.quizAnswer === "O"
                                                    ? "border-blue-500 bg-blue-500/20 text-blue-400"
                                                    : "border-slate-700 bg-[#071023] text-slate-400 hover:border-blue-500"}`}>
                                        O
                                    </button>


                                    {/* X */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setForm((prev) => ({
                                                ...prev,
                                                quizAnswer: "X",
                                            }))
                                        }
                                        className={`
                                            rounded-2xl
                                            border
                                            py-10
                                            text-5xl
                                            font-black
                                            transition
                                            ${
                                                form.quizAnswer === "X"
                                                    ? "border-red-500 bg-red-500/20 text-red-400"
                                                    : "border-slate-700 bg-[#071023] text-slate-400 hover:border-red-500"}`}>
                                        X
                                    </button>

                                </div>

                            </div>

                        )}

                    </section>


                    {/* ============================= */}
                    {/* 등록 버튼 */}
                    {/* ============================= */}

                    <button
                        type="submit"
                        className="
                            w-full
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-600
                            to-violet-600
                            py-4
                            text-lg
                            font-bold
                            shadow-lg
                            transition
                            hover:brightness-110">
                        ⚔ 퀴즈 등록하기
                    </button>

                </form>

            </main>

        </div>
    );
};

export default QuizRegisterComponent;