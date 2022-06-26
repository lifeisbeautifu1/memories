import Posts from '../models/posts.js'
import { StatusCodes } from 'http-status-codes';

export const getPosts = async (req, res) => {
  const { page } = req.query;
  const LIMIT = 6;
  const startIndex = (page - 1) * LIMIT;
  const total = await Posts.countDocuments();
  const posts = await Posts.find()
    .sort({ createdAt: -1 })
    .limit(LIMIT)
    .skip(startIndex);
  res.status(StatusCodes.OK).json({
    posts,
    currentPage: +page,
    numberOfPages: Math.ceil(total / LIMIT),
  });
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  const title = new RegExp(searchQuery, 'i');
  const posts = await Posts.find({
    $or: [{ title }, { tags: { $in: tags?.split(',') } }],
  });
  res.status(StatusCodes.OK).json(posts);
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findById(id);
  res.status(StatusCodes.OK).json(post);
};

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

export const commentOnPost = async (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ comment: 'Please provide name and comment for the comment.' });
  const { id: PostID } = req.params;
  const updatedPost = await Posts.findByIdAndUpdate(
    PostID,
    {
      $push: {
        comments: `${name}: ${comment}`,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json(updatedPost);
};