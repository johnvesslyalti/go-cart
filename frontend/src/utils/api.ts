import axios from "axios"

const api = axios.create({
    // baseURL: "https://go-cart-xbbj.onrender.com/api"
    baseURL: "http://localhost:5000/api"
});

export default api;