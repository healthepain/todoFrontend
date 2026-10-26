import { useContext, useEffect, useState } from 'react'
import Todos from '../components/Todos'
import { useMutation } from "@tanstack/react-query"
import { Link, NavLink } from 'react-router-dom'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/TodoService'
import { AuthContext } from '../context/AuthContext'


function MainMenu() {
    const [filter, setFilter] = useState("all")
    const [todoInput, setTodoInput] = useState("")
    const [todos, settodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(false)
    
    const {logout} = useContext(AuthContext)


    useEffect(() => {
        const fetchApi = async () => {

            try {

                setLoading(true)

                const todos = await getTodos()

                settodos(todos.map((todo) => {
                    return {
                        id: todo.id,
                        title: todo.title,
                        status: todo.is_completed ? "complete" : "pending",
                        is_completed: todo.is_completed,
                    }
                }))


            } catch (e) {
                setError(e)
            } finally {
                // setLoading(false)
                console.log("done");
                setLoading(false)
            }

        }
        fetchApi()
    }, [refresh])



    useEffect(() => {

        console.log("mounted");

        return () => {
            console.log("unmounted");
        }
    }, [])

    const todosFiltered = todos.filter((todo) => {
        if (filter === "all") return true
        else return todo.status === filter
    })

    const mutation = useMutation({
        mutationFn: async () => {
            await createTodo({
                title: todoInput,
                user_id: 1,

            })
            setTodoInput("")
            setRefresh((prev) => !prev)
        }
    })

    const onAddTodo = () => {
        mutation.mutate()
    }

    const onDeleteTodo = async (id) => {
        await deleteTodo(id)
        setRefresh((prev) => !prev)
    }

    const onEditTodo = async (todo) => {
        await updateTodo({
            ...todo,
            is_completed: !todo.is_completed
        })
        setRefresh((prev) => !prev)
    }

    const handleLogout = () => {
        logout()
    }

    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='max-w-7xl mx-auto p-4 flex flex-col items-center' >

                <div className='flex gap-5 items-center justify-center'>
                    <NavLink className="bg-blue-600 text-white font-semibold px-4 py-1 rounded-md shadow-md hover:bg-blue-800" to="/">Home</NavLink> <br />
                    <NavLink className="bg-blue-600 text-white font-semibold px-4 py-1 rounded-md shadow-md hover:bg-blue-800" style={({ isActive }) => (
                        {
                            color: isActive ? "red" : "black",
                        }
                    )} to="/todo">Todo</NavLink><br />
                    <Link className="bg-blue-600 text-white font-semibold px-4 py-1 rounded-md shadow-md hover:bg-blue-800" to="/api">Api</Link><br />
                </div>

                <div className='bg-white flex flex-col items-center justify-center w-[450px] mt-8 gap-4 py-10 px-6 rounded-lg shadow-lg '>

                    <div className='flex justify-between w-full px-4 pb-4 '>
                        <h1 className='font-semibold text-lg'>Todo List</h1>
                        <button onClick={handleLogout} className='text-white px-4 py-1 bg-red-600 rounded-md hover:bg-red-700'>Logout</button>
                    </div>

                    {/* tambah todo */}
                    <div className='flex gap-2 w-full'>
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 placeholder-gray-400"
                            type="text"
                            placeholder="Masukkan todo..."
                            value={todoInput}
                            onChange={(e) => setTodoInput(e.target.value)} />
                        <button className="bg-blue-600 text-white font-semibold px-4 py-1 rounded-md shadow-md hover:bg-blue-800" onClick={onAddTodo}>  tambah</button>
                    </div>

                    <div className='flex gap-2 items-center justify-center w-full'>
                        <button className="bg-blue-600 text-white font-semibold w-full py-1 rounded-md shadow-md hover:bg-blue-800" onClick={() => setFilter("all")}>All</button>
                        <button className="bg-blue-600 text-white font-semibold w-full py-1 rounded-md shadow-md hover:bg-blue-800" onClick={() => setFilter("pending")}>Pending</button>
                        <button className="bg-blue-600 text-white font-semibold w-full py-1 rounded-md shadow-md hover:bg-blue-800" onClick={() => setFilter("complete")}>Complete</button>
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        {loading && <div>loading...</div>}
                        {error && <div>{error}</div>}
                        {todosFiltered.map((items, index) => (
                            <Todos
                                key={index}
                                todo={items}
                                onDeleteTodo={onDeleteTodo}
                                onEditTodo={onEditTodo}
                            />

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )


}

export default MainMenu
