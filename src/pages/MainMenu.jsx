import { useEffect, useState } from 'react'
import Todos from '../components/Todos'
import { useMutation } from "@tanstack/react-query"
import { Link, NavLink, useParams } from 'react-router-dom'


function MainMenu() {
    const [filter, setFilter] = useState("all")
    const [todoInput, setTodoInput] = useState("")

    const [todos, settodos] = useState([])

    useEffect(() => {
        const fetchApi = () => {
            fetch('http://localhost:3000/todos')
                .then((ress) => ress.json())
                .then((data) => {
                    settodos(data.map((todo) => {
                        return {
                            title: todo.title,
                            status: todo.is_completed ? "pending" : "completed"
                        }
                    }))
                })
        }
        fetchApi()
    }, [])

    const { id } = useParams()

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
        mutationFn: () => {
            settodos((prev) => [...prev, {
                title: todoInput,
                status: "pending"
            }])
            setTodoInput("")
        }
    })

    const onAddTodo = () => {
        mutation.mutate()
    }

    const onDeleteTodo = (idx) => {
        settodos((prev) => prev.filter((todo, index) => index !== idx))
    }

    const onEditTodo = (idx) => {
        settodos((prev) =>
            prev.map((todo, index) =>
                index === idx
                    ? {
                        ...todo, status: todo.status === "pending" ? "complete" : "pending"
                    } : todo)
        )
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

                <div className='bg-white flex flex-col items-center justify-center w-[450px] mt-32 gap-4 py-10 px-6 rounded-lg shadow-lg '>
                    <div className='mb-6 font-thin text-sm'>
                        todo : {id}
                    </div>
                    <div className='flex gap-2 w-full'>
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-800 placeholder-gray-400"
                            type="text"
                            placeholder="Masukkan todo..."
                            type="text"
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

                        {todosFiltered.map((items, index) => (
                            <Todos
                                key={index}
                                todo={items}
                                index={index}
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
