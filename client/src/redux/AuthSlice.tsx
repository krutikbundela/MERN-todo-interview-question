import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// Define a type for the slice state
interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  error: {
    message?: string;
    error?: object;
  } | null;
}

type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};

type SignUpResponse = {
  user: {
    name: string;
    email: string;
  };
  message: string;
};
type LogInPayload = {
  email: string;
  password: string;
};

type LogInResponse = {
  message: string;
  accessToken: string;
  user: {
    name: string;
    email: string;
  };
};

type AuthError = { message?: string; error?: Record<string, string[]> };

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

const BASE_URL = "http://localhost:5000/api/v1/auth";

export const signUp = createAsyncThunk<
  SignUpResponse,
  SignUpPayload,
  { rejectValue: AuthError }
>("auth/signUp", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data);
    }
  }
});

export const logIn = createAsyncThunk<LogInResponse, LogInPayload>(
  "auth/logIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
    }
  },
);

//TODO refresh handler
//TODO logout

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Signup
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        if (action.payload) {
          state.error = action.payload;
        }
      })
      //Login
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        if (action.payload) {
          localStorage.setItem("accessToken", action.payload.accessToken);
        }
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export default authSlice.reducer;
