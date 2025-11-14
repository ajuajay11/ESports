import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      // clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
