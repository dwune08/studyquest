import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";

export const submitResult = async ({
  studentNo,
  quizNo,
  resultAnswer,
}) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${API_SERVER_HOST}/results`,
    {
      studentNo,
      quizNo,
      resultAnswer,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};