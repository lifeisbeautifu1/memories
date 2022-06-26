import { useAppSelector } from '../hooks';
import { Link } from 'react-router-dom';

const Pagination = () => {
  const { numberOfPages, currentPage } = useAppSelector((state) => state.posts);

  const pages = [];
  for (let i = 1; i <= numberOfPages; ++i) pages.push(i);
  return (
    <div className="bg-white rounded-full py-4 px-8 shadow-lg flex items-center justify-center gap-2">
      {pages.map((page, index) => (
        <Link
          className={`cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center border border-gray-100 ${
            currentPage === page ? 'bg-blue-500 text-white' : ''
          }`}
          key={index}
          to={`/posts?page=${page}`}
        >
          {page}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
