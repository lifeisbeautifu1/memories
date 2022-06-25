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
    <div className="bg-white mt-20 p-8 rounded shadow-lg w-[400px] m-auto flex flex-col gap-4">
      <header className="flex flex-col items-center justify-center gap-2">
        <FcLock className="text-4xl" />
        <h2 className="font-bold text-2xl">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>
      </header>
      {isSignUp ? (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="p-2 bg-gray-100 rounded outline-black"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            className="p-2 bg-gray-100 rounded outline-black"
            placeholder="Email"
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={isShow ? 'text' : 'password'}
              name="password"
              className="p-2 bg-gray-100 rounded outline-black w-full"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
            />
            {!isShow ? (
              <MdVisibility
                onClick={togglePassword}
                className="absolute top-2.5 right-2 text-xl hover:text-gray-600 cursor-pointer"
              />
            ) : (
              <AiFillEyeInvisible
                onClick={togglePassword}
                className="absolute top-2.5 right-2 text-xl hover:text-gray-600 cursor-pointer"
              />
            )}
          </div>

          <input
            type="password"
            name="password2"
            className="p-2 bg-gray-100 rounded outline-black"
            value={formData.password2}
            placeholder="Repeat password"
            onChange={handleChange}
          />

          <button type="submit" className="btn">
            Sign Up
          </button>

          <span
            className="text-gray-500 cursor-pointer text-right capitalize"
            onClick={toggleSignUp}
          >
            Already have an account? sign in
          </span>
        </form>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="p-2 bg-gray-100 rounded outline-black"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            className="p-2 bg-gray-100 rounded outline-black"
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

          <span
            className="text-gray-500 cursor-pointer text-right capitalize"
            onClick={toggleSignUp}
          >
            don't have an account? sign up
          </span>
        </form>
      )}
    </div>
  );
};

export default Auth;
