import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

const ProtectedRoute = () => {

    const { isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}

export default ProtectedRoute
