import { useState } from 'react'
import { AuthContext } from "./AuthContext"

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const login = () => {
        setIsAuthenticated(true)
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
