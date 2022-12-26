import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/fifa",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
});

export default api;
