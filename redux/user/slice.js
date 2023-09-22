import { createSlice } from "@reduxjs/toolkit";
// import { auth } from "../../config";
// import { loginThunk, logoutThunk, registerThunk } from "./operations";

// const { currentUser } = auth;

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
  // extraReducers: (builder) =>
  //   builder
  //     .addCase(registerThunk.fulfilled, authFullfilled)
  //     .addCase(registerThunk.rejected, rejected)
  //     .addCase(loginThunk.fulfilled, authFullfilled)
  //     .addCase(loginThunk.rejected, rejected)
  //     .addCase(logoutThunk.fulfilled, rejected)
  //     .addCase(logoutThunk.rejected, rejected),
});

// function authFullfilled(state, { payload }) {
//   state.displayName = payload.displayName;
//   state.photoURL = payload.photoURL;
//   state.email = payload.email;
//   state.uid = payload.uid;
// }

// function rejected(state) {
//   state.displayName = "";
//   state.photoURL = "";
//   state.email = "";
//   state.uid = "";
// }

export const userReduser = userSlice.reducer;

export const { updateAuth } = userSlice.actions;
