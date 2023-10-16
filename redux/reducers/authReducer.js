import { createSlice } from "@reduxjs/toolkit";
// initial state of our slice
initialState = {
  user: {},
  error: null,
};

const authSlice = createSlice({
  name: "login",
  initialState,
  // colelction of action objects that takes only actionName: function pairs. we manipulate the initialstate here
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      error = null;
    },
    logout: (state, action) => {
      user = action.payload;
      error = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
