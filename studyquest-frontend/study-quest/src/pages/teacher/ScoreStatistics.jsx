//export default function ScoreStatistics() {
  
  /*const statisticsData = [
    {
      quizNo: 1,
      quizTitle: "2차 방정식의 해 구하기",
      quizType: 1, // 5지 선다
      totalSubmissions: 25,
      correctSubmissions: 23,
      percent: 92,
    },
    {
      quizNo: 2,
      quizTitle: "피타고라스 정리",
      quizType: 2, // O / X
      totalSubmissions: 25,
      correctSubmissions: 8,
      percent: 30,
    },
    {
      quizNo: 3,
      quizTitle: "삼각비의 기본 개념",
      quizType: 3, // 단답형
      totalSubmissions: 25,
      correctSubmissions: 13,
      percent: 50,
    },
  ];

  const getTypeName = (type) => {
    if (type === 1) return "5지 선다";
    if (type === 2) return "O / X";
    return "단답형";
  };

  return (
    <div className="h-full flex flex-col justify-between gap-6">
     
      <div className="flex justify-between items-center border-b border-gray-800/80 pb-4 shrink-0">
        <h3 className="font-bold text-gray-100 text-lg flex items-center gap-2">
          <span>📊</span> 문항별(QUIZ_NO) 정답률 통계
        </h3>
        <span className="text-xs px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 rounded-full font-bold">
          RESULT 데이터 기반 실시간 집계
        </span>
      </div>

     
      <div className="grid grid-cols-3 gap-4 shrink-0">
        <div className="bg-[#0b101d] border border-blue-900/40 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400 font-medium">총 출제 문항 수</p>
            <p className="text-2xl font-black text-cyan-400 mt-1">{statisticsData.length}개</p>
          </div>
          <div className="text-2xl p-2 bg-blue-950/50 border border-blue-800/40 rounded-lg">📝</div>
        </div>

        <div className="bg-[#0b101d] border border-emerald-900/40 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400 font-medium">최고 정답률 문항</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">QUIZ #1 (92%)</p>
          </div>
          <div className="text-2xl p-2 bg-emerald-950/50 border border-emerald-800/40 rounded-lg">👑</div>
        </div>

        <div className="bg-[#0b101d] border border-rose-900/40 p-4 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400 font-medium">최저 정답률 문항</p>
            <p className="text-2xl font-black text-rose-400 mt-1">QUIZ #2 (30%)</p>
          </div>
          <div className="text-2xl p-2 bg-rose-950/50 border border-rose-800/40 rounded-lg">⚠️</div>
        </div>
      </div>

   
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {statisticsData.map((item) => {
          const isHigh = item.percent >= 70;
          const isLow = item.percent < 40;
          const barColor = isHigh
            ? "from-cyan-500 to-blue-600 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
            : isLow
            ? "from-rose-600 to-red-500 shadow-[0_0_12px_rgba(225,29,72,0.4)]"
            : "from-amber-500 to-orange-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]";

          return (
            <div
              key={item.quizNo}
              className="bg-[#0b101d] border border-gray-800/90 rounded-xl p-4 flex flex-col gap-3"
            >
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-cyan-400 text-base">
                    QUIZ #{item.quizNo}
                  </span>
                  <span className="font-bold text-gray-200">{item.quizTitle}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded">
                    [{getTypeName(item.quizType)}]
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="text-gray-400">
                    정답자: <strong className="text-gray-200">{item.correctSubmissions}</strong> / {item.totalSubmissions}명
                  </span>
                  <span
                    className={`font-black text-sm w-12 text-right ${
                      isHigh ? "text-cyan-400" : isLow ? "text-rose-400" : "text-amber-400"
                    }`}
                  >
                    {item.percent}%
                  </span>
                </div>
              </div>

              <div className="w-full bg-[#050811] h-3.5 rounded-full overflow-hidden border border-gray-800 p-0.5 relative flex">
                <div
                  className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-700`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-gray-500 flex justify-between items-center pt-3 border-t border-gray-800/40 shrink-0">
        <span>💡 QUIZ_ANSWER 와 RESULT_ANSWER 비교 연산 집계 결과입니다.</span>
        <span>* 데이터 원본: RESULT 테이블</span>
      </div>
    </div>
  );
}*/

import { Area, AreaChart, Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";

const distributionData = [
  {
    range: "0~20",
    students: 2,
    averageScore: 10,
  },
  {
    range: "21~40",
    students: 4,
    averageScore: 30,
  },
  {
    range: "41~60",
    students: 8,
    averageScore: 50,
  },
  {
    range: "61~80",
    students: 15,
    averageScore: 70,
  },
  {
    range: "81~100",
    students: 21,
    averageScore: 90,
  },
];

const quizStatistics = [
  {
    quizNo: 1,
    title: "2차 방정식의 해 구하기",
    type: "5지선다",
    correct: 23,
    total: 25,
    rate: 92,
  },
  {
    quizNo: 2,
    title: "피타고라스 정리",
    type: "O / X",
    correct: 8,
    total: 25,
    rate: 30,
  },
  {
    quizNo: 3,
    title: "삼각비의 기본 개념",
    type: "단답형",
    correct: 13,
    total: 25,
    rate: 50,
  },
];

const scoreTrendData = [
  { quiz: "QUIZ #1", averageScore: 62 },
  { quiz: "QUIZ #2", averageScore: 68 },
  { quiz: "QUIZ #3", averageScore: 72 },
  { quiz: "QUIZ #4", averageScore: 76 },
  { quiz: "QUIZ #5", averageScore: 81 },
];

const ScoreStatistics = () => {

  const getBarColor = (rate) => {
    if (rate >= 80) {
      return "bg-cyan-400";
    }

    if (rate >= 50) {
      return "bg-amber-400";
    }

    return "bg-rose-500";
  };

  const getTextColor = (rate) => {
    if (rate >= 80) {
      return "text-cyan-400";
    }

    if (rate >= 50) {
      return "text-amber-400";
    }

    return "text-rose-400";
  };

  return (
    <div>
      {/* 상단 제목 */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-5">

        <div>
          <h2 className="text-lg font-bold">
            📊 담당 학년 성적 통계
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            담당 학년 전체 학생의 성적 분포를 확인합니다.
          </p>
        </div>

        <span className="
          rounded-full
          border
          border-cyan-800
          bg-cyan-950/30
          px-4
          py-1.5
          text-[11px]
          font-bold
          text-cyan-400">
          담당 학년 전체
        </span>

      </div>


      {/* 요약 카드 */}
      <div className="mt-6 grid grid-cols-3 gap-4">

        <div className="
          rounded-xl
          border
          border-blue-900/40
          bg-[#080d19]
          p-5">
          <p className="text-xs text-gray-400">
            전체 학생
          </p>

          <p className="mt-2 text-2xl font-black text-cyan-400">
            50명
          </p>
        </div>


        <div className="
          rounded-xl
          border
          border-emerald-900/40
          bg-[#080d19]
          p-5">
          <p className="text-xs text-gray-400">
            평균 점수
          </p>

          <p className="mt-2 text-2xl font-black text-emerald-400">
            72점
          </p>
        </div>


        <div className="
          rounded-xl
          border
          border-violet-900/40
          bg-[#080d19]
          p-5">
          <p className="text-xs text-gray-400">
            최고 점수
          </p>

          <p className="mt-2 text-2xl font-black text-violet-400">
            100점
          </p>
        </div>

      </div>


      {/* ===================================
          막대 + 선 그래프
      ==================================== */}

      <section className="
        mt-6
        rounded-xl
        border
        border-gray-800
        bg-[#080d19]
        p-6">

        <div className="mb-6">
          <h3 className="font-bold">
            📈 학생 성적 분포
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            막대는 점수 구간별 학생 수,
            선은 점수 구간의 평균 흐름을 나타냅니다.
          </p>
        </div>


        <div className="h-[330px] w-full">

          <ResponsiveContainer
            width="100%"
            height="100%">

            <ComposedChart
              data={distributionData}
              margin={{
                top: 20,
                right: 30,
                left: 10,
                bottom: 10,
              }}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#253047"/>

              <XAxis
                dataKey="range"
                stroke="#94a3b8"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12,
                }}/>

              <YAxis
                yAxisId="left"
                stroke="#94a3b8"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
                allowDecimals={false}/>

              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#a78bfa"
                tick={{
                  fill: "#a78bfa",
                  fontSize: 12,
                }}
                domain={[0, 100]}/>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "10px",
                  color: "#ffffff",
                }}/>

              <Legend />

              {/* 학생 수 막대 */}
              <Bar
                yAxisId="left"
                dataKey="students"
                name="학생 수"
                fill="#22d3ee"
                radius={[7, 7, 0, 0]}
                barSize={55}/>

              {/* 평균 점수 선 */}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="averageScore"
                name="평균 점수"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "#a855f7",
                }}
                activeDot={{
                  r: 7,
                }}/>

            </ComposedChart>

          </ResponsiveContainer>

        </div>

      </section>

      {/* ===================================
    영역 그래프 - 전체 성적 추이
==================================== */}

<section className="
  mt-6
  rounded-xl
  border
  border-gray-800
  bg-[#080d19]
  p-6
">

  <div className="mb-6">

    <h3 className="font-bold">
      📈 담당 학년 평균 성적 추이
    </h3>

    <p className="mt-1 text-xs text-gray-500">
      퀴즈별 담당 학년 전체 학생의 평균 점수 변화
    </p>

  </div>


  <div className="h-[300px] w-full">

    <ResponsiveContainer
      width="100%"
      height="100%"
    >

      <AreaChart
        data={scoreTrendData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >

        <defs>
          <linearGradient
            id="scoreArea"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#22d3ee"
              stopOpacity={0.7}
            />

            <stop
              offset="95%"
              stopColor="#22d3ee"
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>


        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#253047"
        />


        <XAxis
          dataKey="quiz"
          stroke="#94a3b8"
          tick={{
            fill: "#94a3b8",
            fontSize: 12,
          }}
        />


        <YAxis
          domain={[0, 100]}
          stroke="#94a3b8"
          tick={{
            fill: "#94a3b8",
            fontSize: 12,
          }}
        />


        <Tooltip
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "10px",
            color: "#ffffff",
          }}
        />

        <Legend />


        <Area
          type="monotone"
          dataKey="averageScore"
          name="평균 점수"
          stroke="#22d3ee"
          strokeWidth={3}
          fill="url(#scoreArea)"
          activeDot={{
            r: 6,
          }}
        />

      </AreaChart>

    </ResponsiveContainer>

  </div>

</section>


      {/* ===================================
          문항별 정답률
      ==================================== */}

      <section className="mt-6">

        <h3 className="mb-4 font-bold">
          📊 문항별 정답률
        </h3>


        <div className="space-y-4">

          {quizStatistics.map((quiz) => (

            <div
              key={quiz.quizNo}
              className="
                rounded-xl
                border
                border-gray-800
                bg-[#080d19]
                p-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <span className="font-bold text-cyan-400">
                    QUIZ #{quiz.quizNo}
                  </span>

                  <span className="font-bold">
                    {quiz.title}
                  </span>

                  <span className="
                    rounded
                    bg-[#1e293b]
                    px-2
                    py-1
                    text-[10px]
                    text-gray-400">
                    {quiz.type}
                  </span>

                </div>


                <div className="flex items-center gap-5 text-xs">

                  <span className="text-gray-400">
                    정답자:{" "}
                    <strong className="text-gray-200">
                      {quiz.correct}
                    </strong>
                    {" / "}
                    {quiz.total}명
                  </span>

                  <strong
                    className={getTextColor(
                      quiz.rate
                    )}>
                    {quiz.rate}%
                  </strong>

                </div>

              </div>


              <div className="
                mt-4
                h-2
                overflow-hidden
                rounded-full
                border
                border-gray-700
                bg-[#030711]">

                <div
                  className={`
                    h-full
                    rounded-full
                    ${getBarColor(quiz.rate)}
                  `}
                  style={{
                    width: `${quiz.rate}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </section>


      <div className="
        mt-10
        border-t
        border-gray-800
        pt-4
        text-[11px]
        text-gray-500">
        💡 현재 그래프는 프론트 화면 확인용 예시 데이터입니다.
      </div>

    </div>
  );
};

export default ScoreStatistics;

