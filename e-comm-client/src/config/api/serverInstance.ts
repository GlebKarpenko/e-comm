import axios from "axios";
import config from "@/config";

const serverInstance = axios.create({
    baseURL: config.mainApi.baseUrl,
    withCredentials: true
});

export default serverInstance;