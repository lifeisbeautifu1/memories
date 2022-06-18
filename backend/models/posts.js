import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide title for post']
    },
    creator: {
        type: String,
        required: [true, 'Please provide creator name']
    },
    message: {
        type: String,
        required: [true, 'Please provide message of the post']
    },
    tags: {
        type: [String]
    },
    selectedFile: {
        type: String,
        required: [true, 'Please provide thumbnail for post'],
    },
    likeCount: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

const Posts = mongoose.model('Posts', postsSchema);

export default Posts;