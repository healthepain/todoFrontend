import { useState } from 'react'
import { AuthContext } from "./AuthContext"
import { registerUser } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const navigate = useNavigate() 

    const login = () => {
        setIsAuthenticated(true)
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

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
