import { createBrowserRouter, Outlet } from "react-router-dom";
import quizRouter from "./quizRouter";
import teacherRouter from "./teacherRouter";

const root = createBrowserRouter([
  // 메인 페이지
  {
    path: "/",
    HydrateFallback: () => <div>Loading...</div>,
    lazy: async () => {
      const { default: Component } = await import("../pages/MainPage");
      return { Component };
    },
  },

  // 로그인 페이지
  {
    path: "/users/login",
    HydrateFallback: () => <div>Loading...</div>,
    lazy: async () => {
      const { default: Component } = await import("../pages/user/LoginPage");
      return { Component };
    },
  },

  // 회원정보 수정 페이지
  {
    path: "/users/:no/modify",
    HydrateFallback: () => <div>Loading...</div>,
    lazy: async () => {
      const { default: Component } = await import("../pages/user/ModifyPage");
      return { Component };
    },
  },

  // 퀴즈 관련 페이지 묶음
  {
    path: "/quizzes",
    element: <Outlet />, // 하위 라우트(list, :no 등)가 정상적으로 렌더링되도록 Outlet 지정
    children: quizRouter(),
  },

  // 선생님 관련 페이지 묶음
  {
    path: "/teacher",
    HydrateFallback: () => <div>Loading...</div>,
    lazy: async () => {
      const { default: Component } = await import("../pages/teacher/TeacherPage");
      return { Component };
    },
    children: teacherRouter(),
  },

  // 학생 마이페이지 (고정 경로 및 파라미터 경로 모두 대응)
  {
    path: "/student",
    HydrateFallback: () => <div>Loading...</div>,
    lazy: async () => {
      const { default: Component } = await import("../pages/student/StudentMyPage");
      return { Component };
    },
  },
  // 기존 /student/:no 형식도 지원하고 싶다면 아래 라우트 유지
  {
    path: "/student/:no",
    HydrateFallback: () => <div>Loading...</div>,
    lazy: async () => {
      const { default: Component } = await import("../pages/student/StudentMyPage");
      return { Component };
    },
  },

  // 랭크 페이지
  {
    path: "/rank",
    HydrateFallback: () => <div>Loading...</div>,
    lazy: async () => {
      const { default: Component } = await import("../pages/RankPage");
      return { Component };
    },
  },

  // 이벤트 페이지
  {
    path: "/event",
    HydrateFallback: () => <div>Loading...</div>,
    lazy: async () => {
      const { default: Component } = await import("../pages/EventPage");
      return { Component };
    },
  },
]);

export default root;