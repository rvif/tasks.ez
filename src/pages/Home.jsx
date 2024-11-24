import { useState, useEffect } from "react";
import TodoList from "../components/todos/TodoList";
import TodoSearch from "../components/todos/TodoSearch";
import { useTodo } from "../contexts/TodoContext";
import { FiPlus, FiCheckCircle, FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motivationalQuotes } from "../constants/quotes";

function Home() {
  const [searchActive, setSearchActive] = useState(false);
  const { todos, loading, error, deleteTodo, updateTodo, searchTodos } =
    useTodo();
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  const handleEdit = (todo) => {
    navigate(`/edit/${todo.id}`);
  };

  const handleToggleComplete = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      await updateTodo(id, { completed: !todo.completed });
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  const handleClearSearch = async () => {
    try {
      setSearchActive(false);
      await searchTodos(""); // Reset to original todos list
    } catch (err) {
      console.error("Failed to clear search:", err);
    }
  };

  const EmptyState = ({ isSearching }) => {
    if (isSearching) {
      return (
        <div className="mt-8 animate-fadeIn">
          <div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 
            border-2 border-gray-700 hover:border-gray-600
            transition-all duration-300 text-center"
          >
            <FiSearch
              className="h-16 w-16 mx-auto text-gray-600 mb-4 
              transition-colors duration-300"
            />
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              No matching tasks found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or clear the search
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-8 animate-fadeIn">
        <div
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 
          border-2 border-gray-700 hover:border-gray-600
          transition-all duration-300 text-center"
        >
          <FiCheckCircle
            className="h-16 w-16 mx-auto text-gray-600 mb-4 
            transition-colors duration-300"
          />
          <h3 className="text-xl font-medium text-gray-300 mb-2">
            All caught up!
          </h3>
          <p className="text-gray-400 mb-6">
            You don't have any tasks yet. Create one to get started.
          </p>
          <button
            onClick={() => navigate("/create")}
            className="text-indigo-400 hover:text-indigo-300 
              transition-colors duration-300
              flex items-center gap-2 mx-auto"
          >
            <FiPlus className="h-5 w-5" />
            <span>Create your first task</span>
          </button>
        </div>
      </div>
    );
  };

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  };

  useEffect(() => {
    const updateQuote = () => {
      setCurrentQuote(getRandomQuote());
    };

    updateQuote();

    const interval = setInterval(updateQuote, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-4xl font-bold tracking-tight select-none">
            <span
              className="text-transparent bg-clip-text animate-text-gradient
              bg-[size:200%] bg-gradient-to-r 
              from-cyan-500 via-purple-500 via-pink-500 
              via-violet-500 via-purple-500 to-cyan-500"
            >
              tasks.ez
              <span className="text-2xl align-text-top ml-1"> ✨ </span>
            </span>
          </h1>
          <div className="flex flex-col items-center space-y-1">
            <p className="text-gray-300 font-normal text-lg">
              {currentQuote?.text ||
                "Stay organized and boost your productivity"}
            </p>
            {currentQuote?.author && (
              <span className="text-gray-500 text-sm">
                — {currentQuote.author}
              </span>
            )}
          </div>
        </div>

        {/* Add new task button */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => navigate("/create")}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 
              text-white rounded-xl font-medium 
              transition-all duration-300 
              hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]
              group"
          >
            <FiPlus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
            <span className="font-light">Create New Task</span>
          </button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <TodoSearch
            setSearchActive={setSearchActive}
            onClearSearch={handleClearSearch}
          />
        </div>

        {/* Loading State */}
        <div
          className={`mt-8 transition-opacity duration-300 
            ${
              loading ? "opacity-100" : "opacity-0 pointer-events-none hidden"
            }`}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border-2 border-gray-700">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="text-gray-400 mt-4 font-light text-center">
              Loading your tasks...
            </p>
          </div>
        </div>

        {/* Error handling */}
        {error && (
          <div className="mt-8 animate-fadeIn">
            <div
              className="bg-red-900/10 backdrop-blur-sm rounded-xl p-8 
              border-2 border-red-500/50 hover:border-red-500/70
              transition-all duration-300"
            >
              <p className="text-red-400 text-center font-light">
                Oops! Something went wrong: {error}
              </p>
            </div>
          </div>
        )}

        {/* Empty State with context awareness */}
        {!loading && !error && todos.length === 0 && (
          <EmptyState isSearching={searchActive} />
        )}

        {/* Todo List */}
        {!loading && !error && todos.length > 0 && (
          <div className="transition-all duration-300 animate-fadeIn">
            <TodoList />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
