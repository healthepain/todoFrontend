
import { Link, NavLink, useNavigate } from 'react-router-dom'


export default function Home() {
    const navigate = useNavigate()

    return (
        <>
            <div>
                <Link to="/home">Home</Link> <br />
                <NavLink style={({ isActive }) => (
                    {
                        color: isActive ? "red" : "black",
                    }
                )} to="/todo">Todo</NavLink><br />
                <Link to="/api">Api</Link><br />
            </div>
            <button onClick={() => navigate("/todo")}>
                Todo
            </button>
        </>
    )
}
