import axios from 'axios';
import { FormData } from '../../pages/Auth';

const API = axios.create({ baseURL: 'http://localhost:5000/users' });

const signUp = async (formData: FormData) => {
  const res = await API.post('/signup', formData);
  return res.data;
};

const signIn = async (formData: FormData) => {
  const res = await API.post('/signin', formData);
  return res.data;
};

const authService = {
  signUp,
  signIn,
};

export default authService;
