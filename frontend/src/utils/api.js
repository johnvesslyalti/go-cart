import axios from "axios"

const api = axios.create({
    baseURL: "https://go-cart-p8xc.onrender.com/api"
});

export default api;