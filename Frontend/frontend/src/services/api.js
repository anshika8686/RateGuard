//to connect axios with gateway on port 4000
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true
});

export default api;