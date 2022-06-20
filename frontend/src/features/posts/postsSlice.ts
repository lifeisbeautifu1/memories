import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import postsService from './postsService';

export interface Post {
  name: string;
  creator: string;
  title: string;
  message: string;
  tags: string[];
  likes?: string[];
  _id?: string;
  createdAt?: string;
  selectedFile: string;
}

interface AppState {
  posts: Post[];
  selectedId: string;
  isLoading: boolean;
  message: string | unknown;
}

const initialState: AppState = {
  posts: [],
  selectedId: '',
  isLoading: false,
  message: '',
};

export const getPosts = createAsyncThunk(
  '/posts/getPosts',
  async (_, thunkAPI) => {
    try {
      return await postsService.getPosts();
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

export const createPost = createAsyncThunk(
  '/posts/createPost',
  async (postData: Post, thunkAPI) => {
    try {
      return await postsService.createPost(postData);
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

export const editPost = createAsyncThunk(
  '/posts/editPost',
  async (postData: any, thunkAPI) => {
    try {
      return await postsService.editPost(postData);
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

export const deletePost = createAsyncThunk(
  '/posts/deletePost',
  async (id: string, thunkAPI) => {
    try {
      return await postsService.deletePost(id);
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

export const likePost = createAsyncThunk(
  '/posts/likePost',
  async (id: string, thunkAPI) => {
    try {
      return await postsService.likePost(id);
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

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectId: (state, action) => {
      state.selectedId = action.payload;
    },
    reset: (state, action) => {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true;
      console.log('get posts pending...');
    });
    builder.addCase(
      getPosts.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        console.log('get posts fulfilled');
        state.isLoading = false;
        state.posts = action.payload;
      }
    );
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(createPost.pending, (state, action) => {
      state.isLoading = true;
      console.log('create post pending...');
    });
    builder.addCase(
      createPost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        console.log('create post fulfilled');
        state.isLoading = false;
        state.posts.push(action.payload);
      }
    );
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      console.log('create post rejected...');
      state.message = action.payload;
    });
    builder.addCase(deletePost.pending, (state, action) => {
      state.isLoading = true;
      console.log('delete post pending...');
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      console.log('delete post fulfilled');
      state.isLoading = false;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      console.log('delete post rejected...');
      state.message = action.payload;
    });
    builder.addCase(likePost.pending, (state, action) => {
      state.isLoading = true;
      console.log('like post pending...');
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      console.log('like post fulfilled');
      state.isLoading = false;
      state.posts = state.posts.map((post) => {
        return post._id === action.payload._id ? action.payload : post;
      });
    });
    builder.addCase(likePost.rejected, (state, action) => {
      state.isLoading = false;
      console.log('like post rejected...');
      state.message = action.payload;
    });
    builder.addCase(editPost.pending, (state, action) => {
      state.isLoading = true;
      console.log('edit post pending...');
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      console.log('edit post fulfilled');
      state.isLoading = false;
      state.posts = state.posts.map((post) => {
        return post._id === action.payload._id ? action.payload : post;
      });
      state.selectedId = '';
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.isLoading = false;
      console.log('edit post rejected...');
      state.message = action.payload;
    });
  },
});

export const { selectId, reset } = postsSlice.actions;

export default postsSlice.reducer;
