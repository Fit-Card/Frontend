// @/store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // userSlice 불러오기

// 스토어 생성
const store = configureStore({
  reducer: {
    user: userReducer, // userReducer 연결
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
