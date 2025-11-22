import { User } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  info: User | null;
  accessToken?: string | null;
}

const initialState: UserState = {
  info: null,
  accessToken: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.info = action.payload;
    },

    setUser: (state, action) => {
      const { user, accessToken } = action.payload || {};

      state.info = user;
      state.accessToken = accessToken;
    },

    logoutUser: () => {
      return initialState;
    },

    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setUserInfo, setUser, logoutUser, setAccessToken } =
  userSlice.actions;

export default userSlice.reducer;
