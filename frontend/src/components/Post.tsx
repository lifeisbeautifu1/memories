import React from 'react';
import { Post as PostType } from '../features/posts/postsSlice';
import { GoThumbsup } from 'react-icons/go';
import { ImBin } from 'react-icons/im';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../hooks';
import { deletePost, selectId, likePost } from '../features/posts/postsSlice';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({
  post: {
    _id,
    creator,
    title,
    message,
    name,
    selectedFile,
    tags,
    likes,
    createdAt,
  },
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [showMore, setShowMore] = React.useState(false);
  return (
    <div className="post">
      <div className="thumbnail-wrapper">
        <img src={selectedFile} alt="thumbnail" />
      </div>
      <div className="overlay">
        <h2>{name}</h2>
        <p>{moment(createdAt).fromNow()}</p>
      </div>
      {user?.id === creator && (
        <div className="edit" onClick={() => dispatch(selectId(_id!))}>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}

      <div className="post-info">
        <p className="tags">{tags.map((tag) => `#${tag.trim()} `)}</p>
        <h3>{title}</h3>
        <p className="message">
          {showMore ? message : message.substring(0, 200)}
          {message.length > 200 && (
            <button
              className="inline"
              onClick={() => setShowMore((prevState) => !prevState)}
            >
              {showMore && message.length > 200 ? 'Show less' : 'Show more'}
            </button>
          )}
        </p>
        <div className="buttons-wrapper">
          <span onClick={() => dispatch(likePost(_id!))}>
            {' '}
            <GoThumbsup />
            Likes {` ${likes?.length}`}
          </span>
          {user?.id === creator && (
            <span
              onClick={() => {
                dispatch(deletePost(_id!));
              }}
            >
              {' '}
              <ImBin />
              Delete
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
