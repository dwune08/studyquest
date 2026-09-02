import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginPayload = {
      userEmail: formData.email,
      userPw: formData.password,
    };

    try {
      const response = await axios.post("http://localhost:8080/users/login", loginPayload);
      const { accessToken, refreshToken, userNo, userName, userType } = response.data;

      if (accessToken) localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

      const userInfo = { userNo, userName, userType };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      alert(`${userName || '모험가'}님, 환영합니다!`);

      if (userType === 1) {
        navigate("/student/dashboard");
      } else if (userType === 2) {
        navigate("/teacher/dashboard");
      } else {
        navigate("/main");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      alert(error.response?.data?.message || "로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between pt-6 relative z-10">
      <div className="flex flex-col gap-6 my-auto pt-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-400">
            이메일 주소
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="quest@study.com"
            required
            className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-11 px-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-400">
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full bg-slate-950/50 border border-slate-800 rounded-lg h-11 px-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-widest rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.4)] active:scale-[0.98] cursor-pointer border border-blue-400/30 shrink-0 mt-auto"
      >
        퀘스트 시작하기
      </button>
    </form>
  );
};

export default LoginComponent;