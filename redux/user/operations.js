import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "../../servises/auth";

export const registerThunk = createAsyncThunk("user/register", registerUser);

export const loginThunk = createAsyncThunk("user/login", loginUser);

export const logoutThunk = createAsyncThunk("user/logout", logoutUser);
