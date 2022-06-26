import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getPost, reset, getPostsBySearch } from '../features/posts/postsSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { RingLoader } from 'react-spinners';
import moment from 'moment';
import CommentSection from './CommentSection';

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { post, posts, isLoading, message } = useAppSelector(
    (state) => state.posts
  );
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (message) toast.error(String(message));
    dispatch(reset({}));
    if (id) {
      dispatch(getPost(id));
    }
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({
          searchTerm: 'none',
          tags: post?.tags.join(','),
        })
      );
    }
  }, [post]);
  if (isLoading) {
    return <RingLoader size={100} color="black" />;
  }
  if (!post) {
    return null;
  }
  const recommendedPosts = posts.filter((rec) => rec._id !== post._id);
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full p-6 bg-white rounded-lg shadow-lg grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold capitalize">{post.title}</h1>
            <h2 className="font-bold text-gray-400">
              {post.tags.map((tag) => `#${tag} `)}
            </h2>
            <p>{post.message}</p>
            <p>Created by: {post.name}</p>
            <p>{moment(post.createdAt).fromNow()}</p>
          </div>
          <CommentSection post={post} />
        </div>
        <div className="w-full">
          <img
            src={post.selectedFile}
            className="w-full max-w-[600px] object-cover rounded shadow-lg"
            alt=""
          />
        </div>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-lg mb-8">
        <h1 className="mb-4 font-bold text-2xl border-b pb-2 border-gray-600">
          You may also like
        </h1>
        <div className="flex gap-4 flex-wrap">
          {recommendedPosts.map((post, index) => {
            return (
              <Link key={index} to={`/posts/${post._id}`}>
                <div className=" shadow rounded flex flex-col gap-2 p-2">
                  <h1 className="font-bold text-xl">{post.title}</h1>
                  <p>{post.name}</p>
                  <p className="font-bold text-gray-400">
                    {post.tags.map((tag) => `#${tag} `)}
                  </p>
                  <img src={post.selectedFile} width="200" alt="" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
