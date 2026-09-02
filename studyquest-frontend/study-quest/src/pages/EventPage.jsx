import BasicLayout from "../layouts/BasicLayout"

const weekdays = ["월", "화", "수", "목", "금"];
const EventPage = () => {
  const attendedDays = ["월"];
  return (
    <BasicLayout>
        <div className="min-h-screen bg-[#020817] text-white">

            <header className="border-b border-slate-700 bg-[#111c31]">

                <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-5">

                    <div className="flex items-center gap-8">

                        <div>
                            <span className="text-xs text-blue-400">
                                STUDY:QUEST
                            </span>

                            <span className="ml-3 text-sm">
                                STUDENT
                            </span>
                        </div>

                        <nav className="flex gap-7 text-lg">
                            <a href="/">Main</a>
                            <a href="/about">About</a>
                            <a href="/todo">Todo</a>
                        </nav>

                    </div>

                    <button className="rounded-xl border border-slate-600 px-5 py-2">
                        로그아웃
                    </button>

                </div>

            </header>


            <main className="mx-auto max-w-5xl px-6 py-14">

                <section className="rounded-2xl border border-slate-700 bg-[#0d172a] p-8">

                    <p className="text-xs text-blue-400">
                        ATTENDANCE
                    </p>

                    <h1 className="mt-2 text-2xl font-bold">
                        이번 주 출석 현황
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        매일 출석하고 퀘스트를 이어가세요.
                    </p>


                    <div className="mt-10 grid grid-cols-5 gap-5">

                        {weekdays.map(day => {

                            const attended =
                                attendedDays.includes(day);

                            return (
                                <div
                                    key={day}
                                    className={`
                                        flex h-24 items-center justify-center
                                        rounded-2xl border font-bold
                                        ${
                                            attended
                                                ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                                                : "border-slate-700 bg-[#111c31] text-slate-400"
                                        }
                                    `}
                                >
                                    {day}
                                </div>
                            );
                        })}

                    </div>


                    <button
                        className="mt-10 w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-bold"
                    >
                        📅 오늘 출석체크
                    </button>

                </section>

            </main>

        </div>
    </BasicLayout>
  );
};

export default EventPage;
