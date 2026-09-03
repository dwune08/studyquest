import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 1. 쿠키 저장 (객체 저장 대응)
export const setCookie = (name, value, days = 1) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);

  return cookies.set(name, value, {
    path: "/",
    expires: expires,
  });
};

// 2. 쿠키 조회 (객체/문자열 자동 파싱 처리)
export const getCookie = (name) => {
  const value = cookies.get(name);
  if (!value) return null;

  // 만약 문자열 형태의 JSON이라면 객체로 변환하여 반환
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value; // 일반 문자열일 경우 그대로 반환
    }
  }

  return value;
};

// 3. 쿠키 삭제
export const removeCookie = (name, path = "/") => {
  return cookies.remove(name, { path });
};