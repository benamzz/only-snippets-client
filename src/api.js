import axios from "axios"

const storedToken = localStorage.getItem("authToken");

const instance = axios.create({
    baseURL: 'http://localhost:5005/api',
    headers: {
        Authorization: `Bearer ${storedToken}`
    }
})

export default instance
