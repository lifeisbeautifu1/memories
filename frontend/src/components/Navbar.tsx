import Logo from '../images/memories.png';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  return (
    <nav>
      <div>
        <h1>Memories</h1>
        <img src={Logo} alt="logo" />
      </div>
      {user ? (
        <div>
          {user.image ? (
            <img className="navbar-picture" src={user.image} alt="" />
          ) : (
            <div className="circle">{user.name.charAt(0)}</div>
          )}

          <h4>{user.name}</h4>
          <button
            className="btn"
            onClick={() => {
              dispatch(logout({}));
              navigate('/auth');
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link className="link" to="/auth">
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
