import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import LoginComponent from "../../components/user/LoginComponent";
import JoinComponent from "../../components/user/JoinComponent";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  
  // 💡 수정된 부분: ?tab=join 이 전달되었을 때만 회원가입(isLoginTab = false)
  // ?tab=join 이 없으면(불러오기 클릭 시) 로그인(isLoginTab = true)이 활성화됩니다.
  const isJoinTab = searchParams.get("tab") === "join";
  const [isLoginTab, setIsLoginTab] = useState(!isJoinTab);

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

      {/* 메인 패널 */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md h-[540px] flex flex-col relative overflow-hidden">
        
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* 상단 탭 ([회원가입] / [로그인]) */}
        <div className="grid grid-cols-2 border-b border-slate-800/80 pb-3 shrink-0 relative z-10">
          <button
            type="button"
            onClick={() => setIsLoginTab(false)}
            className={`text-base font-bold pb-2 transition-all duration-300 relative ${
              !isLoginTab
                ? "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)] cursor-default"
                : "text-slate-500 hover:text-slate-300 cursor-pointer"
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
            className={`text-base font-bold pb-2 transition-all duration-300 relative ${
              isLoginTab
                ? "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)] cursor-default"
                : "text-slate-500 hover:text-slate-300 cursor-pointer"
            }`}
          >
            [ 로그인 ]
            {isLoginTab && (
              <span className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_8px_#3b82f6]" />
            )}
          </button>
        </div>

        {/* 탭 전환 스위칭 */}
        {isLoginTab ? (
          <LoginComponent />
        ) : (
          <JoinComponent onSuccess={() => setIsLoginTab(true)} />
        )}

      </div>
    </div>
  );
};

export default LoginPage;