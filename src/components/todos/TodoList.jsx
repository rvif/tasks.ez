import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { FiInbox } from "react-icons/fi";
import Pagination from "../utils/Pagination";
import { useTodo } from "../../contexts/TodoContext";

function TodoList() {
  const { todos, updateTodo, deleteTodo } = useTodo();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [todos.length]);

  // Loading state
  if (!todos) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border-2 border-gray-700">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="text-gray-400 mt-4 font-medium text-center">
            Loading your tasks...
          </p>
        </div>
      </div>
    );
  }

  // Empty state
  if (todos.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 border-2 border-gray-700 text-center">
          <FiInbox className="h-16 w-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-gray-300 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search or create a new task
          </p>
        </div>
      </div>
    );
  }

  return (
    // Count of todos
    <div className="w-full max-w-4xl mx-auto mt-8">
      {/* Todo Items */}
      <div className="space-y-4">
        {currentTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onEdit={updateTodo}
            onToggleComplete={(id) =>
              updateTodo(id, { completed: !todo.completed })
            }
          />
        ))}
      </div>

      {/* Pagination */}
      {todos.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default TodoList;
