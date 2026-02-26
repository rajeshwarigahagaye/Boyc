import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export const userAPI = {
    login: (data) => API.post('/login', data),
    getProfile: (id) => API.get(`/users/${id}`),
    updateProfile: (id, data) => API.put(`/users/${id}`, data)
};