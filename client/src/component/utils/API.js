import axios from 'axios';

const API = axios.create({
    baseURL: 'http://15.165.164.135:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default API;