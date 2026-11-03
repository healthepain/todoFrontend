import { useContext, useEffect, useState } from 'react'
import Todos from '../components/Todos'
import { useMutation } from "@tanstack/react-query"
import { Link, NavLink } from 'react-router-dom'
import { createTodo, updateTodo, updateTodoByUserId, deleteTodo, deleteTodoByUserId, getTodosByUserId } from '../services/TodoService'
import { AuthContext } from '../context/AuthContext'


function MainMenu() {
    const [filter, setFilter] = useState("all")
    const [todoInput, setTodoInput] = useState("")
    const [todos, settodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [refresh, setRefresh] = useState(false)
    const [titleError, setTitleError] = useState("")
    const [image, setImage] = useState(null)

    const { user, logout } = useContext(AuthContext)


    useEffect(() => {
        const fetchApi = async () => {

            try {

                setLoading(true)
                setError("")

                if (!user?.id) {
                    throw new Error("Data pengguna tidak ditemukan. Silakan login kembali.")
                }

                const todos = await getTodosByUserId(user.id)

                settodos(todos.map((todo) => {
                    return {
                        id: todo.id,
                        title: todo.title,
                        status: todo.is_completed ? "complete" : "pending",
                        is_completed: todo.is_completed,
                        image: todo.image,
                    }
                }))


            } catch (e) {
                setError(e?.response?.data?.message || e.message || "Gagal memuat todo.")
            } finally {
                // setLoading(false)
                console.log("done");
                setLoading(false)
            }

        }
        fetchApi()
    }, [refresh, user?.id])



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
            const formData = new FormData()
            formData.append("title", todoInput)
            formData.append("user_id", 1)

            if (image) {
                formData.append("image", image)
            }


            await createTodo(formData)
            setTodoInput("")
            setImage(null)
            setRefresh((prev) => !prev)
        }
    })

    const onAddTodo = () => {
        if (todoInput.trim().length < 5) {
            setTitleError("Title todo minimal harus 5 karakter");
            return;
        }

        mutation.mutate({
            title: todoInput.trim()
        });

        setTodoInput("");
        setTitleError("");
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

    const handleChangeTodoInput = (e) => {
        const value = e.target.value
        setTodoInput(value)

        if (value.trim().length < 5) {
            setTitleError("Title todo minimal harus 5 karakter")
        } else {
            setTitleError("")
        }
    }

    const handleUpdateByUserId = () => {
        const updateTodos = async () => {

            try {

                setLoading(true)

                const result = await updateTodoByUserId(user.id, true)

                if (result.message === "Success") {
                    //set todos jadi completed semua
                    settodos((prev) =>
                        prev.map(todo => {
                            return {
                                ...todo,
                                status: "Completed",
                                is_completed: true,
                            }
                        })
                    )
                }
            } catch (e) {
                setError(e?.response?.data?.message || e.message || "Gagal mengupdate todo.")
            } finally {
                // setLoading(false)
                console.log("done");
                setLoading(false)
            }

        }
        updateTodos()
    }

    const handleDeleteByUserId = () => {
        const deleteTodos = async () => {

            try {

                setLoading(true)

                const result = await deleteTodoByUserId(user.id)


            } catch (e) {
                setError(e?.response?.data?.message || e.message || "Gagal mengupdate todo.")
            } finally {
                // setLoading(false)
                console.log("done");
                setLoading(false)
                setRefresh((prev) => !prev)
            }

        }
        deleteTodos()
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
                            onChange={handleChangeTodoInput} />
                        <button className="bg-blue-600 text-white font-semibold px-4 py-1 rounded-md shadow-md hover:bg-blue-800" onClick={onAddTodo}>  tambah</button>
                    </div>

                    <input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} />

                    {titleError && <div>{titleError}</div>}

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
                        <div className='flex justify-between mt-4'>
                            <button onClick={handleUpdateByUserId} className='bg-green-700 py-2 px-3 rounded-md hover:bg-green-950 text-white font-semibold'>Completed All</button>
                            <button onClick={handleDeleteByUserId} className='bg-red-700 py-2 px-3 rounded-md hover:bg-red-950 text-white font-semibold'>Delete All</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default MainMenu
