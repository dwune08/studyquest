import { useState } from "react";
import { useCustomNavigate } from "../hooks/useCustomNavigate";

export default function MainMenu() {
  const [activeMenu, setActiveMenu] = useState("start");
  const { goLogin } = useCustomNavigate();

  const menuItems = [
    { id: "start", label: "새로운 시작", desc: "새로운 학습 퀘스트 모험을 시작합니다." },
    { id: "load", label: "불러오기", desc: "저장된 학습 진행 상황을 불러옵니다." },
  ];

  const handleNavigate = (menuId) => {
    if (menuId === "start") {
      goLogin({ tab: "join" });
    } else if (menuId === "load") {
      goLogin();
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#04060e] text-slate-100 flex flex-col justify-between items-center py-16 px-6 font-sans overflow-hidden select-none">
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-80" />

      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent pointer-events-none" />

      <header className="z-10 flex flex-col items-center gap-2 mt-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
            🗡️
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-blue-100 to-sky-300 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            STUDY:QUEST
          </h1>
        </div>
        <p className="text-[10px] sm:text-xs tracking-[0.4em] text-blue-400/60 uppercase font-semibold mt-1">
          The Learning Adventure
        </p>
      </header>

      <main className="z-10 w-full max-w-xs my-auto flex flex-col gap-5">
        {menuItems.map((item) => {
          const isActive = activeMenu === item.id;
          return (
            <button
              key={item.id}
              onMouseEnter={() => setActiveMenu(item.id)}
              onClick={() => handleNavigate(item.id)}
              className={`w-full py-4 px-6 rounded-xl font-bold text-base tracking-[0.25em] transition-all duration-300 cursor-pointer border flex items-center justify-center relative ${
                isActive
                  ? "bg-slate-900/90 border-blue-400 text-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.25)] scale-[1.03]"
                  : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {isActive && (
                <span className="absolute left-4 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
              )}
              <span>{item.label}</span>
            </button>
          );
        })}
      </main>

      <footer className="z-10 flex flex-col items-center">
        <p className="text-xs text-slate-400 tracking-wider font-light h-5">
          {menuItems.find((m) => m.id === activeMenu)?.desc}
        </p>
      </footer>
    </div>
  );
}