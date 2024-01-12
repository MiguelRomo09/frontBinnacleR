import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://backbinnacleem-production.up.railway.app/api',
    baseURL: 'http://localhost:4000/api',
    withCredentials: true
})

export default instance