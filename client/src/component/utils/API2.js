import axios from 'axios';

const API2 = axios.create({
    baseURL: 'https://wwappi.shop/',
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

export default API2;
