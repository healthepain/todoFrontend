import api from "../config/api"

export const registerUser = async (user) => {
    const response = await api.post("/register", user)
    return response.data
}