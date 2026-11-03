import api from "../config/api"

export const getTodos = async () => {
    const response = await api.get("/todos")
    return response.data.data
}

export const getTodosByUserId = async (userId) => {
    const response = await api.get(`/todos/user/${userId}`)
    return response.data.data
}

export const createTodo = async (todo) => {
    const response = await api.post("/todos", todo, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data.data
}

export const updateTodo = async (todo) => {
    const response = await api.patch("/todos", todo)
    return response.data.data
}

export const updateTodoByUserId = async (userId, isCompleted) => {
    const response = await api.patch(`/todos/user/${userId}`, {
        is_completed: isCompleted
    })
    return response.data
}

export const deleteTodo = async (id) => {
    const response = await api.delete(`/todos/${id}`)
    return response.data.data

}


export const deleteTodoByUserId = async (userId) => {
    const response = await api.delete(`/todos/user/${userId}`)
    return response.data.data

}