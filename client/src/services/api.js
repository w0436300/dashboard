// client/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', 
  timeout: 10000,
});



api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getTodayOverview = async () => {
  try {
    const response = await api.get('/api/dashboard/today-overview');
    console.log('API Response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching today overview:', error);
    throw error;
  }
};

export default api;
