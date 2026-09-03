import axios from "axios";
import jwtAxios from "./jwtAxios"; 

const host = "http://localhost:8080";

// 1. 로그인 요청 API (로그인은 토큰이 없는 상태이므로 일반 axios 사용)
export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

  // URLSearchParams 형식으로 보낼 때
  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.pw);

  const res = await axios.post(`${host}/users/login`, form, header);

  return res.data;
};