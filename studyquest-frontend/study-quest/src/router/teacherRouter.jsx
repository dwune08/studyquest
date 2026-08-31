import { Navigate } from "react-router";

const teacherRouter = () => {
   return [
      // 성적 통계 페이지
      {
         path: "statistics",
         HydrateFallback: () => <div>Loading...</div>,
         lazy: async () => {
            const { default: Component } = await import("../pages/teacher/ScoreStatistics");
            return { Component };
         },
      },
      // 퀴즈 관리 페이지
      {
         path: "quiz",
         HydrateFallback: () => <div>Loading...</div>,
         lazy: async () => {
            const { default: Component } = await import("../pages/teacher/ItemManagement");
            return { Component };
         },
      },
      // 학생 관리 페이지
      {
         path: "student",
         HydrateFallback: () => <div>Loading...</div>,
         lazy: async () => {
            const { default: Component } = await import("../pages/teacher/AssignedStudentStatistics");
            return { Component };
         },
      },
      {
         index: true,
         element: <Navigate to="statistics" replace />
      }
   ];
};

export default teacherRouter;
