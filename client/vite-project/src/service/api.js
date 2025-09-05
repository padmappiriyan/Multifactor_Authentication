import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7002/api",
  
});

export default api;