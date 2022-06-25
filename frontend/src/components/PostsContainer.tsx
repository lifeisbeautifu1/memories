import { useAppSelector } from '../hooks';
import Post from './Post';

const PostsContainer = () => {
  const { posts } = useAppSelector((state) => state.posts);
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-8 col-span-3 items-start mb-12">
      {posts?.map((post) => {
        return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};

export default PostsContainer;
