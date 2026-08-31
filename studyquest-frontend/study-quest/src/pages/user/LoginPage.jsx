import { useState } from "react";

const LoginPage = () => {
  const [isLoginTab, setIsLoginTab] = useState(false);

  const [formData, setFormData] = useState({
    userType: 'student',
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
    if (isLoginTab) {
      console.log('로그인 요청:', { email: formData.email, password: formData.password });
    } else {
      console.log('회원가입 요청:', formData);
    }
  };

  return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 text-slate-100 font-sans py-10 px-4 selection:bg-blue-500 selection:text-white">
        
        {/* 헤더 타이틀 */}
        <div className="flex items-center gap-3 mb-6 group cursor-default">
          <span className="text-3xl filter drop-shadow-[0_0_12px_rgba(59,130,246,0.8)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            🗡️
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-blue-100 to-slate-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            STUDY:QUEST
          </h1>
        </div>

        {/* 메인 퀘스트 패널 (카드 전체 크기 완전 고정: h-[540px]) */}
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md h-[540px] flex flex-col relative overflow-hidden">
          
          {/* 상단 파란 빛 아우라 */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* 상단 탭 ([회원가입] / [로그인]) */}
          <div className="grid grid-cols-2 border-b border-slate-800/80 pb-3 shrink-0 relative z-10">
            <button
              type="button"
              onClick={() => setIsLoginTab(false)}
              className={`text-base font-bold pb-2 transition-all duration-300 relative cursor-pointer ${
                !isLoginTab
                  ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              [ 회원가입 ]
              {!isLoginTab && (
                <span className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_8px_#3b82f6]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsLoginTab(true)}
              className={`text-base font-bold pb-2 transition-all duration-300 relative cursor-pointer ${
                isLoginTab
                  ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              [ 로그인 ]
              {isLoginTab && (
                <span className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_8px_#3b82f6]" />
              )}
            </button>
          </div>

          {/* 폼 메인 프레임 */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between pt-6 relative z-10">
            
            {/* 로그인 탭일 때: 상하 중앙 정렬로 균형감 부여 */}
            {isLoginTab ? (
              <div className="flex flex-col gap-6 my-auto pt-2">
                {/* 이메일 */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400">
                    이메일 주소
                  </label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="quest@study.com" required
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-11 px-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>

                {/* 비밀번호 */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400">
                    비밀번호
                  </label>
                  <input
                    type="password" name="password" value={formData.password} onChange={handleChange}
                    placeholder="••••••••" required
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-11 px-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
            ) : (
              /* 회원가입 탭일 때: 타이트하게 요소를 규격화하여 배치 */
              <div className="flex flex-col gap-3.5">
                {/* 사용자 구분 */}
                <div className="flex items-center justify-between gap-2 h-9">
                  <label className="text-xs font-semibold text-slate-400 shrink-0">
                    사용자 구분
                  </label>
                  <div className="flex gap-3 bg-slate-950/60 border border-slate-800 rounded-lg p-1.5 px-3">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-300 hover:text-white transition-colors">
                      <input
                        type="radio" name="userType" value="teacher"
                        checked={formData.userType === 'teacher'}
                        onChange={handleChange}
                        className="w-3.5 h-3.5 accent-blue-500 cursor-pointer"
                      /> 선생님
                    </label>
                    <span className="text-slate-800">|</span>
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-300 hover:text-white transition-colors">
                      <input
                        type="radio" name="userType" value="student"
                        checked={formData.userType === 'student'}
                        onChange={handleChange}
                        className="w-3.5 h-3.5 accent-blue-500 cursor-pointer"
                      /> 학생
                    </label>
                  </div>
                </div>

                {/* 이메일 주소 */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">
                    이메일 주소
                  </label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="quest@study.com" required
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-10 px-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>

                {/* 비밀번호 */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">
                    비밀번호
                  </label>
                  <input
                    type="password" name="password" value={formData.password} onChange={handleChange}
                    placeholder="••••••••" required
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-10 px-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>

                {/* 이름 & 학년 (2열 수평 정렬) */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400">
                      이름
                    </label>
                    <input
                      type="text" name="name" value={formData.name} onChange={handleChange}
                      placeholder="모험가 이름" required
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-10 px-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400">
                      학년
                    </label>
                    <div className="relative">
                      <select
                        name="grade" value={formData.grade} onChange={handleChange}
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-10 px-3 text-xs text-slate-300 outline-none appearance-none focus:border-blue-500 transition-all cursor-pointer"
                      >
                        <option value="1" className="bg-slate-900">1학년</option>
                        <option value="2" className="bg-slate-900">2학년</option>
                        <option value="3" className="bg-slate-900">3학년</option>
                        <option value="4" className="bg-slate-900">4학년</option>
                        <option value="5" className="bg-slate-900">5학년</option>
                        <option value="6" className="bg-slate-900">6학년</option>
                      </select>
                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-xs text-slate-500">
                        ▼
                      </span>
                    </div>
                  </div>
                </div>

                {/* 생년월일 & 연락처 (2열 수평 정렬) */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400">
                      생년월일
                    </label>
                    <input
                      type="date" name="birthDate" value={formData.birthDate} onChange={handleChange}
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-10 px-2.5 text-xs text-slate-300 outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-400">
                      연락처
                    </label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="010-0000-0000"
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-10 px-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 서브밋 버튼 (하단 위치 완전 고정) */}
            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-widest rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.4)] active:scale-[0.98] cursor-pointer border border-blue-400/30 shrink-0 mt-auto"
            >
              {isLoginTab ? '로그인 입장' : '퀘스트 시작하기'}
            </button>
          </form>
        </div>
      </div>
  );
};

export default LoginPage;