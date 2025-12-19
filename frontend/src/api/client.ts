import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_API_URL;

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      const errorMessage =
        error.response.data?.detail ||
        'An error occurred while processing your request';
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Request made but no response
      return Promise.reject(
        new Error('No response from server. Please check your connection.')
      );
    } else {
      // Something else happened
      return Promise.reject(error);
    }
  }
);
