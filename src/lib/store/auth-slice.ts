import { IUser } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
  user: IUser;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    _id: "",
    email: "",
    username: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = initialState.user;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
