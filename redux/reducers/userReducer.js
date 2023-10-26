import { createSlice } from "@reduxjs/toolkit";
// initial state of our slice
const initialState = {
  currentuser: null,
  error: null,
};

const userSlice = createSlice({
  name: "currentuser",
  initialState,
  // colelction of action objects that takes only actionName: function pairs. we manipulate the initialstate here
  reducers: {
    currentuser: (state, action) => {
      state.currentuser = action.payload;
      state.error = null;
    },
  },
});

export const { currentuser } = userSlice.actions;
export default userSlice.reducer;
