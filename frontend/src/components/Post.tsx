import React from 'react';
import { Post as PostType } from '../features/posts/postsSlice';
import { GoThumbsup } from 'react-icons/go';
import { ImBin } from 'react-icons/im';
import moment from 'moment';
import { useAppDispatch } from '../hooks';
import { deletePost, selectId, likePost } from '../features/posts/postsSlice';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({
  post: {
    _id,
    title,
    message,
    creator,
    selectedFile,
    tags,
    likeCount,
    createdAt,
  },
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="post">
      <div className="thumbnail-wrapper">
        <img src={selectedFile} alt="thumbnail" />
      </div>
      <div className="overlay">
        <h2>{creator}</h2>
        <p>{moment(createdAt).fromNow()}</p>
      </div>
      <div className="edit" onClick={() => dispatch(selectId(_id!))}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="post-info">
        <p className="tags">{tags.map((tag) => `#${tag.trim()} `)}</p>
        <h3>{title}</h3>
        <p className="message">{message}</p>
        <div className="buttons-wrapper">
          <span onClick={() => dispatch(likePost(_id!))}>
            {' '}
            <GoThumbsup />
            Likes {` ${likeCount}`}
          </span>
          <span
            onClick={() => {
              dispatch(deletePost(_id!));
            }}
          >
            {' '}
            <ImBin />
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
