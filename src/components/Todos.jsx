function Todos({todo, onDeleteTodo,onEditTodo, index}) {
  return (

    <div onClick={(e) => onEditTodo(index)}>
      <h3>{todo.title} - {todo.status}</h3>
      <button onClick={(e) => onDeleteTodo(index)}>delete</button>
    </div>
  )
}

export default Todos
