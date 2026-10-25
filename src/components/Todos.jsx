
function Todos({ todo, onDeleteTodo, onEditTodo }) {
  return (
    <div
      className="flex justify-between border border-slate-400 rounded-md px-4 py-2"
      onClick={() => onEditTodo(todo)}
    >
      <h3 className="text-gray-500 text-lg font-semibold">
        {todo.title} - {todo.status}
      </h3>

      <button
        className="bg-red-600 text-white font-semibold px-4 py-1 rounded-md shadow-md hover:bg-red-800"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteTodo(todo.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Todos;
