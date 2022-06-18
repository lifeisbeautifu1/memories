import express from 'express'
const router = express.Router();
import { getPosts, createPost, deletePost, likePost, editPost } from '../controllers/posts.js'

router.get('/', getPosts);

router.post('/', createPost);

router.delete('/:id', deletePost);

router.patch('/:id', editPost)

router.patch('/like/:id', likePost);

export default router;