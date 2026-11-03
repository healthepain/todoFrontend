import { useState } from 'react'
import { AuthContext } from "./AuthContext"
import { registerUser, loginUser } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

const getUserFromToken = (token) => {
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
}

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedToken = localStorage.getItem("token");
        return Boolean(getUserFromToken(storedToken));
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || "";
    });
    const [user, setUser] = useState(() => getUserFromToken(localStorage.getItem("token")))
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

            const userDecoded = jwtDecode(tokenResponse)

            setUser(userDecoded)
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
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
