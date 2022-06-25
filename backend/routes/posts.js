import express from 'express'
const router = express.Router();
import { getPosts, createPost, deletePost, likePost, editPost } from '../controllers/posts.js'
import auth from '../middleware/auth.js';

router.get('/', getPosts);

router.post('/', auth, createPost);

router.delete('/:id', auth, deletePost);

router.patch('/:id', auth, editPost);

router.patch('/like/:id', auth, likePost);

export default router;