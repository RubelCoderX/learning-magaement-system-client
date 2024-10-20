import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userResgitration: (state, action) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggOut: (state) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { userResgitration, userLoggedIn, userLoggOut } =
  authSlice.actions;

export default authSlice.reducer;
