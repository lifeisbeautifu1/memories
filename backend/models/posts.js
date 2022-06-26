import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide title for post'],
    },
    name: {
      type: String,
      required: [true, 'Please provide creator name'],
    },
    creator: {
      type: String,
      required: [true, 'Please provide creator id'],
    },
    message: {
      type: String,
      required: [true, 'Please provide message of the post'],
    },
    tags: {
      type: [String],
    },
    selectedFile: {
      type: String,
      required: [true, 'Please provide thumbnail for post'],
    },
    likes: {
      type: [String],
      default: 0,
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model('Posts', postsSchema);

export default Posts;