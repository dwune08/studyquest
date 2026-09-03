
const TeacherFooter = ({ onDungeonEnter }) => {
  return (
    <footer className="py-4 px-12 bg-[#070a12] border-t border-gray-900 flex justify-end shrink-0">
      <button
        type="button"
        onClick={onDungeonEnter}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all cursor-pointer active:scale-95"
      >
        ⚔️ 퀴즈 던전 입장
      </button>
    </footer>
  );
};

export default TeacherFooter;