import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi"; 
import { setCookie, getCookie, removeCookie } from "../utils/cookieUtil";

// 1. 초기 상태 설정 (새로고침 시 쿠키에서 로그인 정보 자동 복원)
const initState = () => {
  const memberCookie = getCookie("member");

  if (memberCookie) {
    return memberCookie;
  }

  return {
    userNo: null,
    studentNo: null,
    teacherNo: null,
    userName: "",
    userEmail: "",
    userType: null,
  };
};

// 2. 비동기 로그인 처리 (createAsyncThunk)
export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

// 3. Slice 정의
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState(),
  reducers: {
    login: (state, action) => {
      console.log("로그인.....", action.payload);
      const data = action.payload;

      // 쿠키에 로그인 데이터 저장 (1일)
      setCookie("member", JSON.stringify(data), 1);

      return data;
    },
    logout: (state, action) => {
      console.log("로그아웃......");

      // 쿠키 삭제
      removeCookie("member");

      // 초기 상태로 리셋
      return {
        userNo: null,
        studentNo: null,
        teacherNo: null,
        userName: "",
        userEmail: "",
        userType: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled : 로그인 성공");

        const payload = action.payload;

        // 로그인 성공 시 서버에서 넘어온 전체 payload 객체를 쿠키에 저장
        if (payload) {
          setCookie("member", JSON.stringify(payload), 1);
        }

        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending : 로그인 처리 중");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected : 로그인 오류");
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;