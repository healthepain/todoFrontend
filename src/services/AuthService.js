import api from "../config/api"

export const registerUser = async (user) => {
    const response = await api.post("/register", user)
    return response.data
}

export const loginUser = async (user) => {
    const response = await api.post("/login", user)
    return response.data
}