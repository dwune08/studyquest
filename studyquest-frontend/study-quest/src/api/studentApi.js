import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";

export const getStudent = async (studentNo) => {
  const rawToken = localStorage.getItem("accessToken");

  if (!rawToken) {
    throw new Error("Access Token이 없습니다.");
  }

  const accessToken = rawToken
    .replace(/^Bearer\s+/i, "")
    .replace(/^"|"$/g, "")
    .trim();

  console.log(
    "학생 API 토큰 확인:",
    accessToken.substring(0, 15) + "..."
  );

  const response = await axios.get(
    `${API_SERVER_HOST}/students/${studentNo}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};