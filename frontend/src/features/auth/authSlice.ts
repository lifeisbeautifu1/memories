import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { FormData } from '../../pages/Auth';
export interface User {
  name: string;
  id: string;
  image: string | null;
  token: string | null;
}

interface AuthState {
  user: User | null;
  message: string | unknown;
}

let user = null;

let tmp: string | null = localStorage.getItem('user');
if (tmp) {
  user = JSON.parse(tmp);
}

const initialState: AuthState = {
  user: user ? user : null,
  message: '',
};

export const signUp = createAsyncThunk(
  '/auth/signup',
  async (formData: FormData, thunkAPI) => {
    try {
      return await authService.signUp(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signIn = createAsyncThunk(
  '/auth/signin',
  async (formData: FormData, thunkAPI) => {
    try {
      return await authService.signIn(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state, action) => {
      let tmp: string | null = localStorage.getItem('user');
      if (tmp) {
        state.user = JSON.parse(tmp);
      }
    },
    logout: (state, action) => {
      localStorage.removeItem('user');
      state.user = null;
    },
    reset: (state) => {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state, action) => {
      console.log('signup pending');
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      let User: User = {
        name: action.payload.name,
        id: action.payload.id,
        image: null,
        token: action.payload.token,
      };
      state.user = User;
      localStorage.setItem('user', JSON.stringify(User));
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(signIn.pending, (state, action) => {
      console.log('signin pending');
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      let User: User = {
        name: action.payload.name,
        id: action.payload.id,
        image: null,
        token: action.payload.token,
      };
      localStorage.setItem('user', JSON.stringify(User));
      state.user = User;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.message = action.payload;
    });
  },
});

export const { auth, logout, reset } = authSlice.actions;
export default authSlice.reducer;
