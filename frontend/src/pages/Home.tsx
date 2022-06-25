import React from 'react';
import PostForm from '../components/PostForm';
import PostsContainer from '../components/PostsContainer';
import RingLoader from 'react-spinners/RingLoader';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getPosts, reset } from '../features/posts/postsSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, message } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  React.useEffect(() => {
    if (message) toast.error(String(message));
    dispatch(reset({}));

    dispatch(getPosts());
  }, [dispatch, navigate, user, message]);
  return (
    <div className="block lg:grid grid-cols-4 gap-4 mb-12">
      {isLoading ? (
        <div className="col-span-3 flex justify-center items-center">
          <RingLoader size={100} color={'black'} />
        </div>
      ) : (
        <PostsContainer />
      )}

      <PostForm />
    </div>
  );
};

export default Home;
