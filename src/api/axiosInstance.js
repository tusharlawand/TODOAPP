// src/api/axiosInstance.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // If you're using AsyncStorage

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/', // Replace with your API URL
  timeout: 10000, // Set a timeout of 10 seconds
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Retrieve token from AsyncStorage or any other secure location
    const token = await AsyncStorage.getItem('token'); // Replace with your token retrieval logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data; // Return only the data
  },
  (error) => {
    const { response } = error;
    if (response) {
      // Server responded with a status code other than 2xx
      console.error('Error Response:', response.data);
      return Promise.reject(response.data); // Pass the error response data
    } else {
      // Network error or timeout
      console.error('Network Error:', error.message);
      return Promise.reject('Network error. Please try again later.');
    }
  }
);

export default axiosInstance;
