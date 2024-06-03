import axios from 'axios';

const API = axios.create({
    baseURL: 'https://wwappi.shop/',
    headers: {
        'Content-Type': 'text/plain',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

export default API;