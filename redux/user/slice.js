import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  photoURL: "",
  email: "",
  uid: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAuth: (state, { payload }) => {
      state.displayName = payload?.displayName || "";
      state.photoURL = payload?.photoURL || "";
      state.email = payload?.email || "";
      state.uid = payload?.uid || "";
    },
  },
});

export const userReduser = userSlice.reducer;

export const { updateAuth } = userSlice.actions;
