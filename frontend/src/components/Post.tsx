import React from 'react';
import { Post as PostType } from '../features/posts/postsSlice';
import { GoThumbsup } from 'react-icons/go';
import { ImBin } from 'react-icons/im';
import moment from 'moment';
import { Link } from 'react-router-dom';
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
    <Link to={`/posts/${_id}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden relative self-start">
        <img
          src={selectedFile}
          className="w-full h-[175px] object-cover"
          alt="thumbnail"
        />
        <div className="overlay">
          <h2 className="font-bold text-xl">{name}</h2>
          <p>{moment(createdAt).fromNow()}</p>
        </div>
        {user?.id === creator && (
          <div
            className="absolute top-5 right-4 text-white cursor-pointer"
            onClick={() => dispatch(selectId(_id!))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
        )}

        <div className="p-4 flex flex-col gap-4">
          <p className="text-gray-400 font-bold">
            {tags.map((tag) => `#${tag.trim()} `)}
          </p>
          <h3 className="font-extrabold capitalize text-lg">{title}</h3>
          <p>
            {showMore ? message : message.substring(0, 200)}
            {message.length > 200 && (
              <button
                className="text-blue-500 inline-block ml-2"
                onClick={() => setShowMore((prevState) => !prevState)}
              >
                {showMore && message.length > 200 ? 'Show less' : 'Show more'}
              </button>
            )}
          </p>
          <div className="flex justify-between">
            <button
              className="flex gap-2 text-blue-500 justify-center items-center hover:bg-gray-100 py-2 px-3 rounded font-bold"
              disabled={user ? false : true}
              onClick={() => dispatch(likePost(_id!))}
            >
              {' '}
              <GoThumbsup />
              Likes {` ${likes?.length}`}
            </button>
            {user?.id === creator && (
              <span
                className="font-bold flex gap-2 text-red-500 justify-center items-center hover:bg-gray-100 py-2 px-3 rounded cursor-pointer"
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
    </Link>
  );
};

export default Post;
