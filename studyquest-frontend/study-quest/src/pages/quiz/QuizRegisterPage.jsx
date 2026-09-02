import BasicLayout from "../../layouts/BasicLayout"
import QuizRegisterComponent from "../../components/quiz/QuizRegisterComponent";

const QuizRegisterPage = () => {
    return (
        <div className="min-h-screen bg-[#070a12] text-white font-sans">

            {/* =========================
                상단 헤더
            ========================== */}
            <header className="
                h-14
                bg-[#0d1322]
                border-b
                border-gray-800/80
                px-8
                flex
                items-center
                justify-between
                text-sm">

                {/* 왼쪽 STUDY:QUEST */}
                <div className="flex items-center gap-3">

                    <span className="text-xl">
                        🗡️
                    </span>

                    <span className="
                        font-extrabold
                        text-base
                        tracking-wider">
                        STUDY:QUEST
                    </span>

                    <span className="
                        px-2
                        py-0.5
                        bg-blue-950/80
                        border
                        border-blue-500/40
                        rounded
                        text-xs
                        text-blue-400
                        font-bold
                        ml-2">
                        ADMIN
                    </span>

                </div>


                {/* 가운데 교사 정보 */}
                <div className="
                    text-gray-300
                    font-medium
                    text-xs">
                    3학년 담당 [선생님]
                </div>


                {/* 로그아웃 */}
                <button
                    type="button"
                    className="
                        px-3
                        py-1
                        bg-[#161f33]
                        border
                        border-gray-700/60
                        hover:border-gray-500
                        rounded
                        text-xs
                        text-gray-300
                        transition-all">
                    로그아웃
                </button>

            </header>


            {/* =========================
                퀴즈 등록 폼
            ========================== */}

            <QuizRegisterComponent />

        </div>
    );
};

export default QuizRegisterPage;