import axios from 'axios';

const API = axios.create({
    baseURL: 'https://wwappi.shop/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default API;