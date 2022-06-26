import express from 'express'
const router = express.Router();
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
  editPost,
  getPostsBySearch,
  commentOnPost,
} from '../controllers/posts.js';
import auth from '../middleware/auth.js';

router.get('/', getPosts);

router.get('/search/', getPostsBySearch);

router.get('/:id', getPost);

router.post('/', auth, createPost);

router.post('/comment/:id', auth, commentOnPost);

router.delete('/:id', auth, deletePost);

router.patch('/:id', auth, editPost);

router.patch('/like/:id', auth, likePost);


export default router;