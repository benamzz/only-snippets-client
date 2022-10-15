import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:5005/api',
})

function api() {
    const storedToken = localStorage.getItem("authToken");
    instance.defaults.headers.Authorization = `Bearer ${storedToken}` // MAJ

    return instance
}

export default api
