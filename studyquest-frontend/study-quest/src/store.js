import { configureStore } from '@reduxjs/toolkit';
import loginSlice from "./slice/loginSlice";

export default configureStore({
   reducer: {
      loginSlice: loginSlice
   }
});