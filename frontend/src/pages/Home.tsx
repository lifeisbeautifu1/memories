import React from 'react';
import {
  PostForm,
  PostsContainer,
  Pagination,
  SearchForm,
} from '../components';
import RingLoader from 'react-spinners/RingLoader';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  getPosts,
  getPostsBySearch,
  reset,
} from '../features/posts/postsSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const searchQuery = query.get('searchQuery');
  const tags = query.get('tags');
  const page = query.get('page') || 1;
  const { isLoading, message } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  React.useEffect(() => {
    if (message) toast.error(String(message));
    dispatch(reset({}));
    if (!searchQuery && !tags) dispatch(getPosts(+page));
    if (searchQuery || tags) {
      dispatch(
        getPostsBySearch({
          searchTerm: searchQuery,
          tags,
        })
      );
    }
  }, [dispatch, navigate, user, message, page]);
  return (
    <div className="block lg:grid grid-cols-10 gap-4 mb-12">
      {isLoading ? (
        <div className="col-span-7 flex justify-center items-center">
          <RingLoader size={100} color={'black'} />
        </div>
      ) : (
        <PostsContainer />
      )}
      <div className="col-span-3 mt-8 lg:mt-0 flex flex-col gap-4">
        <SearchForm />
        <PostForm />
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
