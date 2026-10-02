import { useState } from 'react'
import Todos from '../components/Todos'
import { useMutation } from "@tanstack/react-query"


function MainMenu() {
    const [filter, setFilter] = useState("all")
    const [todoInput, setTodoInput] = useState("")

    const [todos, settodos] = useState([
        {
            title: "contoh todo",
            status: "pending",
        },
    ])

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
        <>
            <div>
                <input
                    type="text"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)} />
                <button onClick={onAddTodo}>tambah todo</button>
            </div>
            <div>
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("pending")}>Pending</button>
                <button onClick={() => setFilter("complete")}>Complete</button>
            </div>
            <div>

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
        </>
    )


}

export default MainMenu
