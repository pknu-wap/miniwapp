import axios from 'axios';

const API = axios.create({
    baseURL: 'https://miniwappi.shop',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default API;