// store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/interfaces/User"; // 사용자 인터페이스
import { mockUser } from "@/mock/mockUser";

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      mockUser.loginId = user.loginId;
      mockUser.name = user.name;
      mockUser.birthDate = user.birthDate;
      mockUser.phoneNumber = user.phoneNumber;
      mockUser.isCertifiedMydata = user.isCertifiedMydata;
      mockUser.token = accessToken;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    updateToken(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { login, logout, updateToken } = userSlice.actions;
export default userSlice.reducer;
