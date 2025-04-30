import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5888',
});

export default instance;
