import React from 'react';
import PostForm from '../components/PostForm';
import PostsContainer from '../components/PostsContainer';
import ClipLoader from 'react-spinners/ClipLoader';
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
    if (!user) navigate('/auth');
    dispatch(reset({}));

    dispatch(getPosts());
  }, [dispatch, navigate, user, message]);
  return (
    <div className="grid">
      {isLoading ? (
        <ClipLoader size={100} color={'#fff'} />
      ) : (
        <PostsContainer />
      )}
      <div className="form-wrapper">
        <PostForm />
      </div>
    </div>
  );
};

export default Home;
