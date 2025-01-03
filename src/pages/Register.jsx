import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '../store/authStore';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import apiClient from '../api/apiClient';

const baseURL = apiClient.defaults.baseURL;

const inputClasses = `
  w-full px-4 py-3 pl-11 
  bg-background-alt-color text-text-color
  border-2 border-transparent
  rounded-xl
  placeholder-text-alt-color
  focus:outline-none focus:border-link-color
  transition-all duration-300
`;

const buttonClasses = `
  w-full py-3.5 px-6
  flex items-center justify-center
  text-sm font-medium
  rounded-2xl
  transition-all duration-300
  focus:outline-none focus:ring-2 focus:ring-offset-2 
`;

const Register = () => {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: async ({ name, email, password }) => {
      const response = await apiClient.post('/auth/register', { name, email, password });
      return response.data;
    },
    onSuccess: (data) => {
      setToken(data.token);
      navigate('/dashboard');
    },
    onError: (error) => {
      setError(error.response?.data?.message || 'Registration failed');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    mutation.mutate({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background-color">

      <div className="w-full max-w-lg">
        <div className="bg-background-alt-color/30 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden p-8">

          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-text-color mb-2">Create Account</h2>
            <p className="text-text-alt-color">Get started with your account</p>
          </div>

          <button
            onClick={() => window.location.href = `${baseURL}/auth/google`}
            className={`${buttonClasses} bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 mb-6 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            aria-label="Continue with Google"
          >
            <FcGoogle className="w-5 h-5 mr-3" aria-hidden="true" />
            Continue with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-alt-color"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-text-alt-color bg-background-alt-color">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="register-form-heading">
            <h3 id="register-form-heading" className="sr-only">Registration Form</h3>

            <div>
              <label htmlFor="name" className="sr-only">Full name</label>
              <div className="relative">
                <HiOutlineUser className="absolute left-3.5 top-3.5 h-5 w-5 text-text-alt-color" aria-hidden="true" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClasses}
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3.5 top-3.5 h-5 w-5 text-text-alt-color" aria-hidden="true" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3.5 top-3.5 h-5 w-5 text-text-alt-color" aria-hidden="true" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClasses}
                  required
                  aria-required="true"
                />
              </div>
            </div>

            {error && (
              <div
                className="py-2 px-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-xl"
                role="alert"
                aria-live="assertive"
              >
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={mutation.isLoading}
              className={`${buttonClasses} bg-link-color text-white hover:bg-opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-link-color`}
              aria-label="Create account"
            >
              {mutation.isLoading ? (
                <div className="flex items-center">
                  <span
                    className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                  ></span>
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-text-alt-color">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-background-alt2-color hover:text-opacity-90">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
