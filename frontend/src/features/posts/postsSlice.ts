import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import postsService from './postsService';

export interface Post {
  creator: string;
  title: string;
  message: string;
  tags: string[];
  likeCount?: number;
  _id?: string;
  createdAt?: string;
  selectedFile: string;
}

interface AppState {
  posts: Post[];
  selectedId: string;
  isLoading: boolean;
}

const initialState: AppState = {
  posts: [],
  selectedId: '',
  isLoading: false,
};

export const getPosts = createAsyncThunk('/posts/getPosts', async () => {
  return await postsService.getPosts();
});

export const createPost = createAsyncThunk(
  '/posts/createPost',
  async (postData: Post) => {
    return await postsService.createPost(postData);
  }
);

export const editPost = createAsyncThunk(
  '/posts/editPost',
  async (postData: any) => {
    return await postsService.editPost(postData);
  }
);

export const deletePost = createAsyncThunk(
  '/posts/deletePost',
  async (id: string) => {
    return await postsService.deletePost(id);
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (id: string) => {
    return await postsService.likePost(id);
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    selectId: (state, action) => {
      state.selectedId = action.payload;
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
      console.log('get posts rejected...');
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
    });
  },
});

export const { selectId } = postsSlice.actions;

export default postsSlice.reducer;
