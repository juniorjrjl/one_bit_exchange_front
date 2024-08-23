import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_PATH;

console.log(baseURL)

const api = axios.create({baseURL});

export default api;