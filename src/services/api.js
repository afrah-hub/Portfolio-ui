import axios from 'axios';

const API_BASE_URL = 'http://localhost:5217/api'; // Updated to match backend launchSettings.json

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProjects = () => api.get('/projects');
export const getSkills = () => api.get('/skills');
export const submitContactForm = (data) => api.post('/contact', data);
export const getDeveloperProfile = () => api.get('/contact/profile');

export default api;
