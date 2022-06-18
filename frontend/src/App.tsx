import React from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { getPosts } from './features/posts/postsSlice';
import Navbar from './components/Navbar';
import PostForm from './components/PostForm';
import PostsContainer from './components/PostsContainer';
import ClipLoader from 'react-spinners/ClipLoader';

const App = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.posts);
  React.useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div className="container">
      <Navbar />
      <div className="grid">
        {isLoading ? (
          <ClipLoader size={150} color={'#fff'} />
        ) : (
          <PostsContainer />
        )}
        <div className="form-wrapper">
          <PostForm />
        </div>
      </div>
    </div>
  );
};

export default App;
