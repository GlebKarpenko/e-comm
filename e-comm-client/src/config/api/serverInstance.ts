import axios from "axios";

const serverInstance = axios.create({
    baseURL: process.env.MAIN_API_BASE_URL || 'http://localhost:8081/',
    withCredentials: true
});

export default serverInstance;