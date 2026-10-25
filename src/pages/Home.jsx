import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 antialiased text-slate-800">
            <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">

                {/* Navigation Menu */}
                <nav className="flex flex-col space-y-1">
                    <Link
                        to="/"
                        className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                        Home
                    </Link>

                    <Link
                        to="/register"
                        className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                        Register
                    </Link>

                    <NavLink
                        to="/todo"
                        className={({ isActive }) =>
                            `px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive
                                ? "bg-red-50 text-red-600 font-semibold"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`
                        }
                    >
                        Todo
                    </NavLink>

                    <Link
                        to="/api"
                        className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                        Api
                    </Link>
                </nav>

                {/* Action Button */}
                <div className="pt-4 border-t border-slate-100">
                    <button
                        onClick={() => navigate("/todo")}
                        className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                    >
                        Buka Todo App
                    </button>
                </div>

            </div>
        </div>
    )
}