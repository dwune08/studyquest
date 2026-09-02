import { useState } from "react";
import axios from "axios";

const JoinComponent = ({ onSuccess }) => {
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
      
      // 페이지 이동 대신 로그인 탭으로 전환
      if (onSuccess) onSuccess(); 
    } catch (error) {
      console.error("회원가입 에러:", error);
      alert(error.response?.data?.message || "회원가입 실패: 입력 정보를 다시 확인해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between pt-6 relative z-10">
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between gap-2 h-9">
          <label className="text-xs font-semibold text-slate-400 shrink-0">
            사용자 구분
          </label>
          <div className="flex gap-3 bg-slate-950/60 border border-slate-800 rounded-lg p-1.5 px-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-300 hover:text-white transition-colors">
              <input
                id="user-teacher"
                type="radio"
                name="userType"
                value="teacher"
                checked={formData.userType === 'teacher'}
                onChange={handleChange}
                className="w-3.5 h-3.5 accent-blue-500 cursor-pointer"
              /> 선생님
            </label>
            <span className="text-slate-800">|</span>
            <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-300 hover:text-white transition-colors">
              <input
                id="user-student"
                type="radio"
                name="userType"
                value="student"
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="quest@study.com"
            autoComplete="username"
            required
            className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-10 px-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-400">
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            autoComplete="new-password"
            required
            className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-10 px-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400">
              이름
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="모험가 이름"
              required
              className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-10 px-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400">
              학년
            </label>
            <div className="relative">
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
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
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-10 px-2.5 text-xs text-slate-300 outline-none focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400">
              연락처
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="010-0000-0000"
              className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-10 px-3 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-widest rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.4)] active:scale-[0.98] cursor-pointer border border-blue-400/30 shrink-0 mt-auto"
      >
        {formData.userType === 'student' ? '🗡️ 모험가 등록' : '👑 길드 마스터 등록'}
      </button>
    </form>
  );
};

export default JoinComponent;