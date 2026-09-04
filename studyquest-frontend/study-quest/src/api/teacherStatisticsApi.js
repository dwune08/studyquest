import jwtAxios from "./jwtAxios";

export const getTeacherGradeSummary = async () => {
  const response = await jwtAxios.get("/teachers/me/summary");

  return response.data;
};

export const getTeacherStudentScores = async () => {
  const response = await jwtAxios.get("/teachers/me/students");

  return response.data;
};

export const getQuizResults = async (quizNo, page = 1, size = 10) => {
  const response = await jwtAxios.get(
    `/results/quiz/${quizNo}`,
    {
      params: {
        page,
        size,
      },
    }
  );

  return response.data;
};