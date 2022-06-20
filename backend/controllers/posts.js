import Posts from '../models/posts.js'
import { StatusCodes } from 'http-status-codes';

export const getPosts = async (req, res) => {
    const posts = await Posts.find();
    res.status(StatusCodes.OK).json(posts);
}

export const createPost = async (req, res) => {
    const post = await Posts.create(req.body);
    res.status(StatusCodes.CREATED).json(post);
}

export const deletePost = async (req, res) => {
    const post = await Posts.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json(post);
}

export const editPost = async (req, res) => {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    res.status(StatusCodes.OK).json(post);
}

export const likePost = async (req, res) => {
  let post = await Posts.findById(req.params.id);
  if (post.likes.includes(req.userId)) {
    post.likes = post.likes.filter((id) => id !== req.userId);
  } else {
    post.likes.push(req.userId);
  }
  const updatedPost = await Posts.findByIdAndUpdate(req.params.id, post, {
    new: true,
    runValidators: true,
  });
  return res.status(StatusCodes.OK).json(updatedPost);
};