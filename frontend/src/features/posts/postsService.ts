import axios from 'axios';
import { idText } from 'typescript';
import { Post, SearchQuery } from './postsSlice';

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

const getPosts = async (page: number) => {
  const res = await API.get(`/?page=${page}`);
  return res.data;
};

const getPost = async (id: string) => {
  const res = await API.get('/' + id);
  return res.data;
};

const getPostsBySearch = async (searchQuery: SearchQuery) => {
  const { data } = await API.get(
    `/search/?searchQuery=${searchQuery.searchTerm || 'none'}&tags=${
      searchQuery.tags
    }`
  );
  return data;
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

const commentOnPost = async (name: string, comment: string, id: string) => {
  console.log('hello');
  const res = await API.post('/comment/' + id, {
    name,
    comment,
  });
  return res.data;
};

const postsService = {
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
  editPost,
  getPostsBySearch,
  commentOnPost,
};

export default postsService;
