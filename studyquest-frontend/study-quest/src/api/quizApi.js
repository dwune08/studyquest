import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";

const getAuthConfig = () => {
  const token = localStorage.getItem("accessToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getQuiz = async (quizNo) => {
  const response = await axios.get(
    `${API_SERVER_HOST}/quizzes/${quizNo}`,
    getAuthConfig()
  );

  return response.data;
};

export const getStudentQuiz = async (quizNo) => {
  const response = await axios.get(
    `${API_SERVER_HOST}/quizzes/${quizNo}/student`,
    getAuthConfig()
  );

  return response.data;
};