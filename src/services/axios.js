import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://college-website-backend-soiv.onrender.com',
});

export default instance;
