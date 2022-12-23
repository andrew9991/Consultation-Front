import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/fifa",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
});

export default api;
