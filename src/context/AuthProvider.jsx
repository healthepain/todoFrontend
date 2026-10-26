import { useState } from 'react'
import { AuthContext } from "./AuthContext"
import { registerUser, loginUser } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState("")
    const navigate = useNavigate()

    const login = async (email, password) => {
        try {
            const userParam = {
                email: email,
                password: password
            }

            const response = await loginUser(userParam)

            const tokenResponse = response.token

            setToken(tokenResponse)
            localStorage.setItem("token", tokenResponse)
            
            setUser(userParam)
            setIsAuthenticated(true)
            navigate("/todo")
        } catch (error) {
            console.log(error);

        }
    }

    const register = async (user) => {
        try {
            const responseUser = await registerUser(user)
            setUser(responseUser)
            setIsAuthenticated(true)
            navigate("/todo")
        } catch (error) {
            console.log(error);

        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        setUser(null)
        setToken("")
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
