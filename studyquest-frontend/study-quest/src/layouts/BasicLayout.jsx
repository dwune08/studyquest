import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // 1. useLocation 추가
import FooterMenu from "../components/menus/FooterMenu";
import TopMenu from "../components/menus/TopMenu";
import { useCustomNavigate } from "../hooks/useCustomNavigate";
import { useSelector } from "react-redux";
import jwtAxios from "../api/jwtAxios";

const BasicLayout = ({
  children,
  userInfo,
  onAttendanceClick,
  onQuizDungeonClick,
  onLogout,
  userType,
}) => {
  const { goEvent, goQuizList } = useCustomNavigate();
  const location = useLocation(); // 2. 현재 경로 파악

  // Redux에 저장된 로그인 사용자 정보
  const reduxUser = useSelector((state) => state.loginSlice) || {};

  // 학생 상태 정보
  const [studentStatus, setStudentStatus] = useState(null);

  const finalUserType = userInfo?.userType ?? userType ?? reduxUser.userType;

  // 3. /quizzes/register 경로일 때만 푸터 숨김 처리
  const isQuizRegisterPage = location.pathname === "/quizzes/register";

  useEffect(() => {
    // 학생인 경우에만 학생 상태 조회
    if (finalUserType !== 1) return;

    const loadStudentStatus = async () => {
      try {
        const res = await jwtAxios.get("/mypage/me");

        if (res.data?.status) {
          setStudentStatus(res.data.status);
        }
      } catch (error) {
        console.error("학생 상태 정보 조회 실패:", error);
      }
    };

    loadStudentStatus();
  }, [finalUserType]);

  // userInfo가 직접 전달된 값 + 학생 상태 정보 조합
  const finalUserInfo = {
    ...userInfo,

    role:
      userInfo?.role ??
      (reduxUser.userType === 2 ? "teacher" : "student"),

    userNo:
      userInfo?.userNo ??
      reduxUser.userNo,

    userType:
      userInfo?.userType ??
      reduxUser.userType,

    userName:
      userInfo?.userName ??
      reduxUser.userName,

    teacherGrade:
      userInfo?.teacherGrade ??
      reduxUser.teacherGrade,

    userLevel:
      userInfo?.userLevel ??
      studentStatus?.statusLevel ??
      1,

    currentExp:
      userInfo?.currentExp ??
      studentStatus?.statusExp ??
      0,

    maxExp:
      userInfo?.maxExp ??
      studentStatus?.nextLevelExp ??
      100,
  };

  const handleAttendance = (e) => {
    if (onAttendanceClick) {
      onAttendanceClick(e);
    }
    goEvent();
  };

  const handleQuizDungeon = (e) => {
    if (onQuizDungeonClick) {
      onQuizDungeonClick(e);
    }
    goQuizList();
  };

  return (
    <div className="w-screen h-screen min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden font-sans">
      <TopMenu
        {...finalUserInfo}
        userType={finalUserType}
        onLogout={onLogout}
      />

      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          {children}
        </main>

        {/* 4. /quizzes/register 페이지가 아닐 때만 푸터 출력 */}
        {!isQuizRegisterPage && (
          <nav className="shrink-0 w-full">
            <FooterMenu
              userType={finalUserType}
              onAttendanceClick={handleAttendance}
              onQuizDungeonClick={handleQuizDungeon}
            />
          </nav>
        )}
      </div>
    </div>
  );
};

export default BasicLayout;