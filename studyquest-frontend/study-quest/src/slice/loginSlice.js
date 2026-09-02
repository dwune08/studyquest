import { createSlice } from "@reduxjs/toolkit";

const initState = {
    email: '',
    userName: '',
    userType: null,     // 0: 관리자, 1: 학생, 2: 선생님
    teacherNo: null,    // 선생님 고유 번호
    studentNo: null,    // 학생 고유 번호
    teacherGrade: null,
    studentGrade: null
};

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            console.log("로그인.....", action.payload);
            const payload = action.payload;

            // 서버에서 내려준 DTO 필드값들을 state에 안전하게 매핑
            state.email = payload.userEmail || payload.email || '';
            state.userName = payload.userName || '';
            state.userType = payload.userType ?? null;
            state.teacherNo = payload.teacherNo ?? null;
            state.studentNo = payload.studentNo ?? null;
            state.teacherGrade = payload.teacherGrade ?? null;
            state.studentGrade = payload.studentGrade ?? null;
        },
        
        logout: (state, action) => {
            console.log("로그아웃...... ");
            // 로그아웃 시 상태를 초기값으로 리셋
            return { ...initState };
        }
    }
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;