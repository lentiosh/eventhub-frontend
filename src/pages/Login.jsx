import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc'; 

const loginUser = async ({ email, password }) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

const Login = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data.token);
      navigate('/dashboard');
    },
    onError: (error) => {
      setError(error.response?.data?.message || 'Login failed');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); 
    mutation.mutate({ email, password });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-background-background-color flex items-center justify-center px-half-spacing">
      <div className="w-full max-w-sm bg-background-color rounded-lg border border-border-color shadow-lg p-6">
        
        <h2 className="text-center text-2xl font-semibold text-text-color mb-4">
          Welcome Back
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center px-4 py-2 border border-border-color rounded-md bg-white hover:bg-background-alt-color transition-colors duration-200"
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          Continue with Google
        </button>

        
        <div className="flex items-center my-4">
          <hr className="flex-grow border-border-color" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-border-color" />
        </div>

        
        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-text-color">
              Email Address
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineMail className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-4 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-link-color focus:border-link-color transition-colors duration-200 text-gray-700"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-text-color">
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineLockClosed className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-4 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-link-color focus:border-link-color transition-colors duration-200 text-gray-700"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={mutation.isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-full text-sm font-medium text-background-color ${
              mutation.isLoading
                ? 'bg-link-color cursor-not-allowed'
                : 'bg-link-color hover:bg-opacity-90 transition-opacity duration-300'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-link-color`}
          >
            {mutation.isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-text-alt-color">
          Don’t have an account?{' '}
          <Link to="/register" className="text-link-color hover:underline font-medium">
            Register here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
