import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";

export const getStatus = async (studentNo) => {
  const rawToken = localStorage.getItem("accessToken");

  if (!rawToken) {
    throw new Error("Access Token이 없습니다.");
  }

  const accessToken = rawToken
    .replace(/^Bearer\s+/i, "")
    .replace(/^"|"$/g, "")
    .trim();

  const response = await axios.get(
    `${API_SERVER_HOST}/students/${studentNo}/status`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};