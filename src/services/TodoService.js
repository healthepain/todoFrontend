import api from "../config/api"

export const getTodos = async () => {
    const response = await api.get("/todos")
    return response.data
}

export const createTodo = async (todo) => {
    const response = await api.post("/todos", todo)
    return response.data
}

export const updateTodo = async (todo) => {
    const response = await api.patch("/todos", todo)
    return response.data
}

export const deleteTodo = async (id) => {
    const response = await api.delete(`/todos/${id}`)
    return response.data
}