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

export const getSalesTrend  = async () => {
  try {
    const response = await api.get('/api/dashboard/sales-trend');
    console.log('API Response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching today overview:', error);
    throw error;
  }
};

export const getTopProducts   = async () => {
  try {
    const response = await api.get('/api/dashboard/top-products');
    console.log('API Response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching today overview:', error);
    throw error;
  }
};

export const getChannelConversions = async () => {
  try {
    const response = await api.get('/api/dashboard/channel-conversions');
    console.log('API Response:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching today overview:', error);
    throw error;
  }
};

export const getCustomerInsights = async () => {
  try {
    const response = await api.get('/api/customer-insights');
    return response.data;
  } catch (error) {
    console.error('Error fetching customer insights:', error);
    throw error;
  }
};

export const getTrafficTrend = async () => {
  try {
    const response = await api.get('/api/customer-insights/traffic-trend');
    return response.data;
  } catch (error) {
    console.error('Error fetching traffic trend:', error);
    throw error;
  }
};

export const getCustomerRatio = async () => {
  try {
    const response = await api.get('/api/customer-insights/customer-ratio');
    return response.data;
  } catch (error) {
    console.error('Error fetching customer ratio:', error);
    throw error;
  }
};

export const getGeoDistribution = async () => {
  try {
    const response = await api.get('/api/customer-insights/geo-distribution');
    return response.data;
  } catch (error) {
    console.error('Error fetching geo distribution:', error);
    throw error;
  }
};


export default api;
