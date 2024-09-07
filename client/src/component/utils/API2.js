import axios from 'axios';

const API2 = axios.create({
    baseURL: 'https://miniwappi.shop',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
});

export default API2;
