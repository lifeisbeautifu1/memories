import React from 'react';
import { FcLock } from 'react-icons/fc';
import { MdVisibility } from 'react-icons/md';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { User } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { auth, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

export interface FormData {
  name?: string;
  email: string;
  password: string;
  password2?: string;
}

const initialState: FormData = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

const Auth = () => {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [isShow, setIsShow] = React.useState(false);
  const { user, message } = useAppSelector((state) => state.auth);
  const togglePassword = () => setIsShow((prevState) => !prevState);
  const toggleSignUp = () => {
    setIsSignUp((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (message) {
      toast.error(String(message));
    }
    if (user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, dispatch, message, navigate]);

  const [formData, setFormData] = React.useState(initialState);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(formData));
    } else {
      dispatch(signIn(formData));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="auth-form">
      <header>
        <FcLock className="auth-icon" />
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
      </header>
      {isSignUp ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            className="form-control"
            placeholder="Email"
            onChange={handleChange}
          />
          <div>
            <input
              type={isShow ? 'text' : 'password'}
              name="password"
              className="form-control"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
            />
            {!isShow ? (
              <MdVisibility onClick={togglePassword} className="show-icon" />
            ) : (
              <AiFillEyeInvisible
                onClick={togglePassword}
                className="show-icon"
              />
            )}
          </div>
          <div>
            <input
              type="password"
              name="password2"
              className="form-control"
              value={formData.password2}
              placeholder="Repeat password"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn">
            Sign Up
          </button>

          <span onClick={toggleSignUp}>Already have an account? sign in</span>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="form-control"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
          />
          <button type="submit" className="btn">
            Sign In
          </button>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const { credential } = credentialResponse;
              if (credential) {
                const user = jwt_decode(credential) as any;
                console.log(user);
                if (user) {
                  let User: User = {
                    name: user.name,
                    id: user.sub,
                    image: user.picture,
                    token: credential,
                  };
                  localStorage.setItem('user', JSON.stringify(User));
                  dispatch(auth({}));
                  navigate('/');
                }
              }
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />

          <span onClick={toggleSignUp}>don't have an account? sign up</span>
        </form>
      )}
    </div>
  );
};

export default Auth;
