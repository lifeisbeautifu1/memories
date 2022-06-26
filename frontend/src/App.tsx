import { Navbar, PostDetails } from './components';
import Home from './pages/Home';
import Auth from './pages/Auth';

import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID || ''}>
      <div className="bg-gray-100 font-primary h-screen overflow-scroll">
        <div className="container w-9/10 m-auto">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </GoogleOAuthProvider>
  );
};

export default App;
