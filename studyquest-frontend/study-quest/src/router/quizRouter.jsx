const quizRouter = () => {
  return [
    // /quizzes 접속 시 렌더링될 기본 인덱스 페이지 (퀴즈 리스트)
    {
      index: true,
      HydrateFallback: () => <div>Loading...</div>,
      lazy: async () => {
        const { default: Component } = await import("../pages/quiz/QuizListPage");
        return { Component };
      },
    },
    // 퀴즈 풀이 페이지 (/quizzes/:no)
    {
      path: ":no",
      HydrateFallback: () => <div>Loading...</div>,
      lazy: async () => {
        const { default: Component } = await import("../pages/quiz/QuizDetailPage");
        return { Component };
      },
    },
    // 퀴즈 결과 페이지
    {
      path: ":no/result",
      HydrateFallback: () => <div>Loading...</div>,
      lazy: async () => {
        const { default: Component } = await import("../pages/quiz/QuizResultPage");
        return { Component };
      },
    },
    // 퀴즈 등록 페이지 (/quizzes/register)
    {
      path: "register",
      HydrateFallback: () => <div>Loading...</div>,
      lazy: async () => {
        const { default: Component } = await import("../pages/quiz/QuizRegisterPage");
        return { Component };
      },
    },
    // 퀴즈 수정 페이지 (/quizzes/:no/edit)
    {
      path: ":no/edit",
      HydrateFallback: () => <div>Loading...</div>,
      lazy: async () => {
        const { default: Component } = await import("../pages/quiz/QuizEditPage");
        return { Component };
      },
    },
  ];
};

export default quizRouter;