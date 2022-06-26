import { useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { Post, commentOnPost } from '../features/posts/postsSlice';

interface CommentSectionProps {
  post: Post;
}

const CommentSection: React.FC<CommentSectionProps> = ({ post }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post?.comments || []);
  const dispatch = useAppDispatch();
  const commentsRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (comment) {
      setComments([...comments, `${user?.name}: ${comment}`]);
      if (user) {
        if (post) {
          dispatch(
            commentOnPost({
              name: user?.name,
              comment,
              //@ts-ignore
              id: post?._id,
            })
          );
        }
      }
    }
    commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
    setComment('');
  };
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-2 overflow-y-scroll border border-gray-100 rounded p-4 h-[200px]">
        {comments?.length === 0 ? (
          <h1 className="font-bold text-lg text-center">
            No comment here... Be the first!
          </h1>
        ) : null}
        {comments?.map((c, index) => {
          return (
            <p className="" key={index}>
              <span className="font-bold capitalize">{c.split(':')[0]}</span>
              <span>{c.split(':')[1]}</span>
            </p>
          );
        })}
        <div ref={commentsRef}></div>
      </div>

      {user && (
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-lg">Enter comment:</h1>
          <input
            value={comment}
            className="p-2 bg-gray-100 rounded"
            type="text"
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="btn" onClick={handleClick}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
