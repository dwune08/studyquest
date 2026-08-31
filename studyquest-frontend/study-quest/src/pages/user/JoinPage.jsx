import { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";

const JoinPage = () => {
  const [formData, setFormData] = useState({
    userType: 'student', // 'teacher' or 'student'
    email: '',
    password: '',
    name: '',
    birthDate: '',
    phone: '',
    grade: '3',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('회원가입 데이터:', formData);
    // TODO: axios.post('http://localhost:8080/api/user/join', formData)
  };
  return (
    <BasicLayout>
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-white font-sans py-12 px-4">
      {/* 타이틀 로고 */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">🗡️</span>
        <h1 className="text-3xl font-extrabold tracking-widest text-slate-100">STUDY:QUEST</h1>
      </div>

      {/* 회원가입 카드 */}
      <div className="w-full max-w-lg bg-white rounded-2xl p-8 sm:p-10 shadow-2xl text-slate-800">
        {/* 상단 탭 */}
        <div className="flex justify-center gap-8 mb-10 border-b border-slate-100 pb-2">
          <button className="text-lg font-bold pb-2 text-blue-600 border-b-2 border-blue-600 scale-105 transition-all">
            [회원가입]
          </button>
          <button className="text-lg font-bold pb-2 text-slate-400 hover:text-slate-600 transition-all cursor-pointer">
            [로그인]
          </button>
        </div>

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* 사용자 구분 (라디오 버튼 스타일) */}
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm font-bold text-slate-700 shrink-0">사용자 구분 :</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input 
                  type="radio" name="userType" value="teacher" 
                  checked={formData.userType === 'teacher'} 
                  onChange={handleChange}
                  className="w-4 h-4 accent-blue-600"
                /> 선생님
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input 
                  type="radio" name="userType" value="student" 
                  checked={formData.userType === 'student'} 
                  onChange={handleChange}
                  className="w-4 h-4 accent-blue-600"
                /> 학생
              </label>
            </div>
          </div>

          {/* 이메일 */}
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm font-bold text-slate-700 shrink-0">이메일 :</label>
            <input
              type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="zzzqw11@naver.com" required
              className="w-full bg-transparent border-b-2 border-slate-300 py-1 px-1 text-sm outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm font-bold text-slate-700 shrink-0">비밀번호 :</label>
            <input
              type="password" name="password" value={formData.password} onChange={handleChange}
              placeholder="*******" required
              className="w-full bg-transparent border-b-2 border-slate-300 py-1 px-1 text-sm outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* 이름 */}
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm font-bold text-slate-700 shrink-0">이름 :</label>
            <input
              type="text" name="name" value={formData.name} onChange={handleChange}
              placeholder="김초딩" required
              className="w-full bg-transparent border-b-2 border-slate-300 py-1 px-1 text-sm outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* 생년월일 */}
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm font-bold text-slate-700 shrink-0">생년월일 :</label>
            <input
              type="date" name="birthDate" value={formData.birthDate} onChange={handleChange}
              className="w-full bg-transparent border-b-2 border-slate-300 py-1 px-1 text-sm outline-none focus:border-blue-500 transition-colors text-slate-500"
            />
          </div>

          {/* 연락처 */}
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm font-bold text-slate-700 shrink-0">연락처 :</label>
            <input
              type="tel" name="phone" value={formData.phone} onChange={handleChange}
              placeholder="010-1234-5678"
              className="w-full bg-transparent border-b-2 border-slate-300 py-1 px-1 text-sm outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* 학년 선택 (드롭다운) */}
          <div className="flex items-center gap-3">
            <label className="w-24 text-sm font-bold text-slate-700 shrink-0">학년 선택 :</label>
            <div className="relative w-full">
              <select 
                name="grade" value={formData.grade} onChange={handleChange}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-lg py-2 px-3 text-sm outline-none appearance-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="1">1학년</option>
                <option value="2">2학년</option>
                <option value="3">3학년</option>
                <option value="4">4학년</option>
                <option value="5">5학년</option>
                <option value="6">6학년</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>

          {/* 가입 버튼 */}
          <button
            type="submit"
            className="mt-6 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/20 active:scale-[0.98] cursor-pointer"
          >
            퀘스트 시작하기
          </button>
        </form>
      </div>
    </div>
   </BasicLayout>
  );
};

export default JoinPage;
