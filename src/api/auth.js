import axios from 'axios';

export const registerUser = async ({ name, email, password }) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};
