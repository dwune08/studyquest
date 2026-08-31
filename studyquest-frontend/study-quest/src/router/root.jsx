import { createBrowserRouter } from "react-router";
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
   {
      path: "/quizzes",
      HydrateFallback: () => <div>Loading...</div>,
      lazy: async () => {
         const { default: Component } = await import("../pages/quiz/QuizListPage");
         return { Component };
      },

      // quiz 하위 라우팅 설정
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
   // 학생 페이지
   {
      path: "/student/:no",
      HydrateFallback: () => <div>Loading...</div>,
      lazy: async () => {
         const { default: Component } = await import("../pages/StudentPage");
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