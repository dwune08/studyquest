import { Navigate } from "react-router";

const quizRouter = () => {
   return [
      // 퀴즈 리스트 페이지
      {
         path: "list",
         HydrateFallback: () => <div>Loading...</div>,
         lazy: async () => {
            const { default: Component } = await import("../pages/quiz/QuizListPage");
            return { Component };
         },
      },
      // 퀴즈 풀이 페이지
      {
         path: ":no",
         HydrateFallback: () => <div>Loading...</div>,
         lazy: async () => {
            const { default: Component } = await import("../pages/quiz/QuizDetailPage");
            return { Component };
         },
      },
      // 퀴즈 등록 페이지
      {
         path: "register",
         HydrateFallback: () => <div>Loading...</div>,
         lazy: async () => {
            const { default: Component } = await import("../pages/quiz/QuizRegisterPage");
            return { Component };
         },
      },
      // 퀴즈 수정 페이지
      {
         path: ":no/edit",
         HydrateFallback: () => <div>Loading...</div>,
         lazy: async () => {
            const { default: Component } = await import("../pages/quiz/QuizEditPage");
            return { Component };
         },
      },
      {
         index: true,
         element: <Navigate to="list" replace />
      }
   ];
};

export default quizRouter;
