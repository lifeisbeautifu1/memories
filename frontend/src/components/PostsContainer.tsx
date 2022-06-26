import { useAppSelector } from '../hooks';
import Post from './Post';

const PostsContainer = () => {
  const { posts } = useAppSelector((state) => state.posts);
  return (
    // <div className="flex flex-wrap justify-center md:justify-start gap-8 col-span-3 items-start">
    <div className="col-span-7 grid  xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      {posts?.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};

export default PostsContainer;
