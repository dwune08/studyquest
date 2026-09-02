import { useEffect, useState } from "react";
import { useParams } from "react-router";
import jwtAxios from "../../api/jwtAxios";
import { useCustomNavigate } from "../../hooks/useCustomNavigate";

const ModifyPage = () => {
  const { no } = useParams();
  const { goStudentMyPage } = useCustomNavigate();

  const [formData, setFormData] = useState({
    userType: "student",
    email: "",
    password: "",
    name: "",
    grade: "3",
    birthDate: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        setLoading(true);
        const res = await jwtAxios.get(`/member/${no}`);
        if (res.data) {
          setFormData({
            userType: res.data.role === "TEACHER" || res.data.userType === 2 ? "teacher" : "student",
            email: res.data.email || res.data.userEmail || "",
            password: "",
            name: res.data.name || res.data.userName || "",
            grade: String(res.data.grade || res.data.studentGrade || res.data.teacherGrade || "3").replace("학년", ""),
            birthDate: res.data.birthDate || res.data.userBirth || "",
            phone: res.data.phone || res.data.userPhone || "",
          });
        }
      } catch (err) {
        console.error("회원 정보 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    if (no) {
      fetchMemberData();
    }
  }, [no]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const updateData = {
        name: formData.name,
        phone: formData.phone,
        ...(formData.password && { password: formData.password }),
      };

      await jwtAxios.put(`/member/modify/${no}`, updateData);
      alert("회원 정보가 성공적으로 수정되었습니다.");
      goStudentMyPage();
    } catch (err) {
      console.error("회원 정보 수정 실패:", err);
      alert("정보 수정에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  // 공통 입력창 스타일 정의
  // 1) 수정 불가능한 input 스타일 (어둡고 차분한 느낌)
  const disabledInputStyle = 
    "w-full bg-slate-950/30 border border-slate-800/60 rounded-lg h-10 px-3 text-xs text-slate-500 cursor-not-allowed outline-none select-none";

  // 2) 수정 가능한 input 스타일 (은은한 블루 테두리 + 글로우 + 활성화 텍스트)
  const editableInputStyle = 
    "w-full bg-slate-950/80 border border-blue-500/40 rounded-lg h-10 px-3 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 hover:border-blue-500/70 transition-all duration-200 shadow-[0_0_10px_rgba(59,130,246,0.1)]";

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

        {/* 상단 탭 헤더 */}
        <div className="grid grid-cols-1 border-b border-slate-800/80 pb-3 shrink-0 relative z-10">
          <div className="text-center text-base font-bold pb-2 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)] relative">
            [ 회원정보 수정 ]
            <span className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_8px_#3b82f6]" />
          </div>
        </div>

        {/* 폼 메인 프레임 */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between pt-6 relative z-10">
          
          <div className="flex flex-col gap-3.5">
            
            {/* 1. 사용자 구분 (수정 불가) */}
            <div className="flex items-center justify-between gap-2 h-9">
              <label className="text-xs font-semibold text-slate-500 shrink-0">
                사용자 구분
              </label>
              <div className="flex gap-3 bg-slate-950/30 border border-slate-800/60 rounded-lg p-1.5 px-3 opacity-60">
                <label className="flex items-center gap-1.5 cursor-not-allowed text-xs text-slate-500">
                  <input
                    type="radio"
                    name="userType"
                    value="teacher"
                    checked={formData.userType === "teacher"}
                    disabled
                    className="w-3.5 h-3.5 accent-slate-600 cursor-not-allowed"
                  /> 선생님
                </label>
                <span className="text-slate-800">|</span>
                <label className="flex items-center gap-1.5 cursor-not-allowed text-xs text-slate-500">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={formData.userType === "student"}
                    disabled
                    className="w-3.5 h-3.5 accent-slate-600 cursor-not-allowed"
                  /> 학생
                </label>
              </div>
            </div>

            {/* 2. 이메일 주소 (수정 불가) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">
                이메일 주소
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className={disabledInputStyle}
              />
            </div>

            {/* 3. 비밀번호 (수정 가능 ✨) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-blue-300 flex items-center gap-1">
                비밀번호 
                <span className="text-[10px] text-blue-400/80 font-normal">(변경시에만 입력)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse ml-auto" title="수정 가능" />
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={editableInputStyle}
              />
            </div>

            {/* 4. 이름(수정 가능 ✨) / 학년(수정 불가) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-blue-300 flex items-center justify-between">
                  이름
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" title="수정 가능" />
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="모험가 이름"
                  required
                  className={editableInputStyle}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">
                  학년
                </label>
                <div className="relative">
                  <select
                    value={formData.grade}
                    disabled
                    className={disabledInputStyle}
                  >
                    <option value="1">1학년</option>
                    <option value="2">2학년</option>
                    <option value="3">3학년</option>
                  </select>
                  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-xs text-slate-600">
                    ▼
                  </span>
                </div>
              </div>
            </div>

            {/* 5. 생년월일(수정 불가) / 연락처(수정 가능 ✨) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">
                  생년월일
                </label>
                <input
                  type="text"
                  value={formData.birthDate}
                  disabled
                  placeholder="연도-월-일"
                  className={disabledInputStyle}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-blue-300 flex items-center justify-between">
                  연락처
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" title="수정 가능" />
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="010-0000-0000"
                  className={editableInputStyle}
                />
              </div>
            </div>

          </div>

          {/* 서브밋 버튼 */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm tracking-widest rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.4)] active:scale-[0.98] cursor-pointer border border-blue-400/30 shrink-0 mt-auto disabled:opacity-50"
          >
            {loading ? "수정 중..." : "🗡️ 캐릭터 정보 수정"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ModifyPage;