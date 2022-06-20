import axios from 'axios';
import { Post } from './postsSlice';

const API = axios.create({ baseURL: 'http://localhost:5000/posts' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    //@ts-ignore
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user') as string)?.token
    }`;
  }
  return req;
});

const getPosts = async () => {
  const res = await API.get('/');
  return res.data;
};

const createPost = async (postData: Post) => {
  const res = await API.post('/', postData);
  return res.data;
};

const deletePost = async (id: string) => {
  const res = await API.delete('/' + id);
  return res.data;
};

const likePost = async (id: string) => {
  const res = await API.patch(`/like/${id}`);
  return res.data;
};

const editPost = async (postData: Post) => {
  const res = await API.patch(`/${postData._id}`, postData);
  return res.data;
};

const postsService = {
  getPosts,
  createPost,
  deletePost,
  likePost,
  editPost,
};

export default postsService;
