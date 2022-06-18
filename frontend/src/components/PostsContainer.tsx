import { useAppSelector } from '../hooks';
import Post from './Post';

const PostsContainer = () => {
  const { posts } = useAppSelector((state) => state.posts);
  return (
    <div className="posts-container">
      {posts?.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};

export default PostsContainer;
