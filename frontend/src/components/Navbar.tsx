import Logo from '../images/memories-Logo.png';
import Text from '../images/memories-Text.png';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  return (
    <nav className="px-12 py-4 border-t border-gray-100  my-8 flex justify-between items-center bg-white rounded-full shadow-lg overflow-visible">
      <Link className="flex items-center justify-center gap-4" to="/">
        <img src={Logo} className="w-12" alt="logo" />
        <img src={Text} className="w-40" alt="logo" />
      </Link>

      {user ? (
        <div className="flex items-center justify-center gap-4">
          {user.image ? (
            <img
              className="w-14 rounded-full hidden md:block"
              src={user.image}
              alt=""
            />
          ) : (
            <div
              className="rounded-full bg-purple-800 w-14 h-14 md:flex items-center
            justify-center text-white font-bold text-lg hidden "
            >
              {user.name.charAt(0)}
            </div>
          )}

          <h4 className="font-bold text-lg hidden md:block">{user.name}</h4>
          <button
            className="py-2 px-3 bg-gray-800 text-white font-bold transition duration-300 transform hover:scale-[0.97] capitalize shadow-md rounded-full"
            onClick={() => {
              dispatch(logout({}));
              navigate('/auth');
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          className="py-2 px-3 bg-gray-800 text-white font-bold transition duration-300 transform hover:scale-[0.97] capitalize shadow-md rounded-full"
          to="/auth"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
