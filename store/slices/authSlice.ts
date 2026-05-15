import { AuthState, User } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Keep this for register flow — you get full user back from /UserAuth
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    },

    // New — for login flow where backend only returns { token }
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload);
      // user stays null until setUser is called
    },

    // Call this once you fetch/decode user profile after login
    setUser: (state, action: PayloadAction<User>) => {
      state.user = { ...state.user, ...action.payload };
    },

    updateBalance: (state, action: PayloadAction<number>) => {
      if (state.user) state.user.balance = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, setToken, setUser, updateBalance, logout } =
  authSlice.actions;
export default authSlice.reducer;
