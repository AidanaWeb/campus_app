import { User } from "@/types/user.type";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  info: User | object;
}

const initialState: UserState = {
  info: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
