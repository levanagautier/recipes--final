import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    deleteToken: (state) => {
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, deleteToken } = appSlice.actions;

export default appSlice.reducer;
