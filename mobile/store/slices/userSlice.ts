import { User } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  info: User | null;
  token?: string | null;
}

const initialState: UserState = {
  info: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.info = action.payload;
    },

    setUser: (state, action) => {
      const { user, token } = action.payload || {};

      state.info = user;
      state.token = token;
    },
  },
});

export const { setUserInfo, setUser } = userSlice.actions;

export default userSlice.reducer;
