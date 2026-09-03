import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux"; // 1. useDispatch 임포트
import { login } from "../../slice/loginSlice"; // 2. 만든 login 액션 임포트 (경로 확인 필요)
import { useCustomNavigate } from "../../hooks/useCustomNavigate";
import { useSearchParams } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch(); // 3. dispatch 훅 선언
  const { goStudentMyPage, goTeacherPage } = useCustomNavigate(); 
  const [searchParams] = useSearchParams();
  const isJoinFromUrl = searchParams.get("tab") === "join";
  const [isLoginTab, setIsLoginTab] = useState(!isJoinFromUrl);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginTab) {
      // 1. 로그인 요청
      const loginPayload = {
        userEmail: formData.email,
        userPw: formData.password,
      };

      try {
        const response = await axios.post("http://localhost:8080/users/login", loginPayload);
        
        // 백엔드 응답 데이터 추출 (teacherNo 포함)
        const { 
          accessToken, 
          refreshToken, 
          userNo, 
          studentNo, 
          teacherNo,     // 👈 선생님 고유 번호 추출
          userName, 
          userEmail, 
          userType, 
          studentGrade,
          teacherGrade   // 👈 선생님 학년 추출
        } = response.data;

        // 토큰 localStorage 저장
        if (accessToken) localStorage.setItem("accessToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        
        // 4. Redux 및 로컬스토리지에 담을 유저 객체 통합 생성
        const userInfo = { 
          userNo: userNo || studentNo || teacherNo, 
          studentNo: studentNo || null,
          teacherNo: teacherNo || null, // 👈 teacherNo 확실히 매핑
          userName, 
          userEmail,
          userType,
          studentGrade: studentGrade || null,
          teacherGrade: teacherGrade || null
        };


        // 5. 🔴 핵심: Redux 스토어에 유저 정보 디스패치!
        dispatch(login(userInfo));

        // 6. 새로고침 대비 로컬스토리지에도 저장
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        alert(`${userName || '모험가'}님, 환영합니다!`);

        // 커스텀 훅을 통한 이동 제어
        if (userType === 1) {
          goStudentMyPage();
        } else if (userType === 2) {
          goTeacherPage();
        } else {
          // 기타 권한 처리
        }

      } catch (error) {
        console.error("로그인 에러:", error);
        alert(error.response?.data?.message || "로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");
      }

    } else {
      // 2. 회원가입 요청 로직 (기존과 동일)
      const isStudent = formData.userType === 'student';

      const signUpPayload = {
        userEmail: formData.email,
        userPw: formData.password,
        userName: formData.name,
        userBirth: formData.birthDate,
        userPhone: formData.phone,
        userType: isStudent ? 1 : 2,
        studentGrade: isStudent ? parseInt(formData.grade, 10) : null,
        teacherGrade: !isStudent ? parseInt(formData.grade, 10) : null,
      };

      try {
        const response = await axios.post("http://localhost:8080/users", signUpPayload);
        alert(response.data.message || "회원가입이 완료되었습니다! 로그인 해주세요.");
        
        setIsLoginTab(true);
        setFormData((prev) => ({ ...prev, password: '' })); 

      } catch (error) {
        console.error("회원가입 에러:", error);
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message); 
        } else {
          alert("회원가입 실패: 서버와의 통신에 문제가 발생했습니다. 다시 시도해주세요.");
        }
      }
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

      {/* 메인 퀘스트 패널 */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md h-[540px] flex flex-col relative overflow-hidden">
        
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
          
          {/* 로그인 탭일 때 */}
          {isLoginTab ? (
            <div className="flex flex-col gap-6 my-auto pt-2">
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
            /* 회원가입 탭일 때 */
            <div className="flex flex-col gap-3.5">
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
                    </select>
                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-xs text-slate-500">
                      ▼
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">
                    생년월일
                  </label>
                  <input
                    type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-10 px-2.5 text-xs text-slate-300 outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-400">
                    연락처
                  </label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                    placeholder="010-0000-0000"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-10 px-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 서브밋 버튼 */}
          <button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-widest rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.4)] active:scale-[0.98] cursor-pointer border border-blue-400/30 shrink-0 mt-auto"
          >
            {isLoginTab ? '⚔️ 모험 시작하기' : formData.userType === "student" ? '🗡️ 모험가 등록' : '👑 길드 마스터 등록'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;