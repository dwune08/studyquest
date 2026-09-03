import { useState, useEffect } from "react";
import jwtAxios from "../../api/jwtAxios";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ScoreStatistics = () => {
  const [summary, setSummary] = useState({
    totalStudents: 0,
    averageScore: 0,
    maxScore: 0,
  });
  const [distributionData, setDistributionData] = useState([]);
  const [quizStatistics, setQuizStatistics] = useState([]);
  const [scoreTrendData, setScoreTrendData] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await jwtAxios.get("/teachers/statistics");
        const data = response.data;

        setSummary(data.summary || { totalStudents: 0, averageScore: 0, maxScore: 0 });
        setDistributionData(data.distribution || []);
        setQuizStatistics(data.quizzes || []);
        setScoreTrendData(data.trends || []);
      } catch (err) {
        console.error("통계 데이터를 불러오는 중 오류 발생:", err);
        setError("성적 통계 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const getBarColor = (rate) => {
    if (rate >= 80) return "bg-cyan-400";
    if (rate >= 50) return "bg-amber-400";
    return "bg-rose-500";
  };

  const getTextColor = (rate) => {
    if (rate >= 80) return "text-cyan-400";
    if (rate >= 50) return "text-amber-400";
    return "text-rose-400";
  };

  if (loading) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center text-cyan-400">
        성적 통계 데이터를 불러오는 중입니다...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center text-rose-500">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* 상단 제목 */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-5">
        <div>
          <h2 className="text-lg font-bold">📊 담당 학년 성적 통계</h2>
          <p className="mt-1 text-xs text-gray-500">
            담당 학년 전체 학생의 성적 분포를 확인합니다.
          </p>
        </div>

        <span className="rounded-full border border-cyan-800 bg-cyan-950/30 px-4 py-1.5 text-[11px] font-bold text-cyan-400">
          담당 학년 전체
        </span>
      </div>

      {/* 요약 카드 */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-blue-900/40 bg-[#080d19] p-5">
          <p className="text-xs text-gray-400">전체 학생</p>
          <p className="mt-2 text-2xl font-black text-cyan-400">
            {summary.totalStudents}명
          </p>
        </div>

        <div className="rounded-xl border border-emerald-900/40 bg-[#080d19] p-5">
          <p className="text-xs text-gray-400">평균 점수</p>
          <p className="mt-2 text-2xl font-black text-emerald-400">
            {summary.averageScore}점
          </p>
        </div>

        <div className="rounded-xl border border-violet-900/40 bg-[#080d19] p-5">
          <p className="text-xs text-gray-400">최고 점수</p>
          <p className="mt-2 text-2xl font-black text-violet-400">
            {summary.maxScore}점
          </p>
        </div>
      </div>

      {/* 1. 학생 성적 분포 그래프 (Area 부드러운 흐름형태로 변경) */}
      <section className="mt-6 rounded-xl border border-gray-800 bg-[#080d19] p-6">
        <div className="mb-6">
          <h3 className="font-bold">📈 학생 펑균 성적 분포</h3>
          <p className="mt-1 text-xs text-gray-500">
            점수 구간별 학생 수의 전체적인 밀도와 분포 흐름을 나타냅니다.
          </p>
        </div>

        <div className="h-[330px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={distributionData}
              margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="studentCountArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#253047" />
              <XAxis dataKey="range" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} allowDecimals={false} />
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "10px", color: "#ffffff" }} />
              <Legend />
              <Area type="monotone" dataKey="students" name="학생 수" stroke="#22d3ee" strokeWidth={3} fill="url(#studentCountArea)" activeDot={{ r: 7 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 2. 담당 학년 평균 성적 추이 그래프 (Bar 막대 형태로 변경) */}
      <section className="mt-6 rounded-xl border border-gray-800 bg-[#080d19] p-6">
        <div className="mb-6">
          <h3 className="font-bold">📈 퀴즈별 평균 점수</h3>
          <p className="mt-1 text-xs text-gray-500">퀴즈별 담당 학년 전체 학생의 평균 점수 비교</p>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#253047" />
              <XAxis dataKey="quiz" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis domain={[0, 100]} stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "10px", color: "#ffffff" }} />
              <Legend />
              <Bar dataKey="averageScore" name="평균 점수" fill="#a855f7" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 문항별 정답률 */}
      <section className="mt-6">
        <h3 className="mb-4 font-bold">📊 문항별 정답률</h3>
        <div className="space-y-4">
          {quizStatistics.map((quiz) => (
            <div key={quiz.quizNo} className="rounded-xl border border-gray-800 bg-[#080d19] p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-cyan-400">QUIZ #{quiz.quizNo}</span>
                  <span className="font-bold">{quiz.title}</span>
                  <span className="rounded bg-[#1e293b] px-2 py-1 text-[10px] text-gray-400">{quiz.type}</span>
                </div>
                <div className="flex items-center gap-5 text-xs">
                  <span className="text-gray-400">
                    정답자: <strong className="text-gray-200">{quiz.correct}</strong> / {quiz.total}명
                  </span>
                  <strong className={getTextColor(quiz.rate)}>{quiz.rate}%</strong>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full border border-gray-700 bg-[#030711]">
                <div className={`h-full rounded-full ${getBarColor(quiz.rate)}`} style={{ width: `${quiz.rate}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ScoreStatistics;