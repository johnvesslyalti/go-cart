import axios from "axios"

const api = axios.create({
    baseURL: "https://go-cart-xbbj.onrender.com/api"
});

export default api;