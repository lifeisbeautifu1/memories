import axios from 'axios';
import { Post } from './postsSlice';

const API_URL = '/posts';

const getPosts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const createPost = async (postData: Post) => {
  const res = await axios.post(API_URL, postData);
  return res.data;
};

const deletePost = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

const likePost = async (id: string) => {
  const res = await axios.patch(`${API_URL}/like/${id}`);
  return res.data;
};

const editPost = async (postData: Post) => {
  const res = await axios.patch(`${API_URL}/${postData._id}`, postData);
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
