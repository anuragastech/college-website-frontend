import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5888',
  // baseURL: 'https://college-website-backend-org.onrender.com',


});

export default instance;
