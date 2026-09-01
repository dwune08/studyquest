import { createBrowserRouter, Navigate } from "react-router-dom";
//import quizRouter from "./quizRouter";
import teacherRouter from "./teacherRouter";
//import StudentMyPage from "../pages/student/StudentMyPage";
import QuizListPage from "../pages/quiz/QuizListPage";
import QuizPlayPage from "../pages/quiz/QuizPlayPage";
import QuizResultPage from "../pages/quiz/QuizResultPage";

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

  // 회원가입 페이지
  {
    path: "/users/join",
    HydrateFallback: () => <div>Loading...</div>,
    lazy: async () => {
      const { default: Component } = await import("../pages/user/JoinPage");
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
  /*{
    path: "/quizzes",
    HydrateFallback: () => <div>Loading...</div>,
    lazy: async () => {
      const { default: Component } = await import("../pages/quiz/QuizListPage");
      return { Component };
    },
    children: quizRouter(),
  },*/

  // 선생님 관련 페이지 묶음
  {
    path: "/teacher/:no",
    HydrateFallback: () => <div>Loading...</div>,
    lazy: async () => {
      const { default: Component } = await import("../pages/teacher/TeacherPage");
      return { Component };
    },
    children: teacherRouter(),
  },

  // 학생 페이지
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

  // 학생 마이페이지
  {
    path: "/mypage",
    element: ( <Navigate to="/student/5" replace />
    ),
  },

  // 퀴즈 목록
  /*{
    path: "/quiz",
    element: <QuizListPage />,
  },

  // 퀴즈 풀이
  {
    path: "/quiz/:quizNo",
    element: <QuizPlayPage />,
  },

  // 퀴즈 결과
  {
    path: "/quiz/:quizNo/result",
    element: <QuizResultPage />,
  },*/

  {
  path: "/quizzes",
  element: <QuizListPage />,
},

// 퀴즈 결과
{
  path: "/quizzes/:quizNo/result",
  element: <QuizResultPage />,
},

// 퀴즈 풀이
{
  path: "/quizzes/:quizNo",
  element: <QuizPlayPage />,
},
]);



export default root;