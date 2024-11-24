import { useState, useEffect } from "react";
import { useTodo } from "../../contexts/TodoContext";
import { FiSearch, FiAlertCircle, FiX } from "react-icons/fi";

function TodoSearch({ setSearchActive, onClearSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchTodos } = useTodo();
  const [error, setError] = useState("");

  // Enhanced clear search function
  const clearSearch = async () => {
    try {
      setSearchTerm("");
      setSearchActive(false);
      await searchTodos(""); // Reset to original todos list
      setError(""); // Clear any existing errors
      onClearSearch(); // Call the parent's clear search function
    } catch (err) {
      setError("Failed to clear search: " + err.message);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await performSearch(searchTerm);
  };

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // Enhanced search function
  const performSearch = async (term) => {
    try {
      setError("");
      if (term.trim()) {
        setSearchActive(true);
        await searchTodos(term);
      } else {
        await clearSearch(); // Use the same clear function
      }
    } catch (err) {
      setError("Search failed: " + err.message);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 group">
            <FiSearch
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 
                text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search your tasks..."
              className={`w-full pl-12 pr-12 py-3.5 rounded-xl 
                bg-gray-800 border-2 
                ${error ? "border-red-500" : "border-gray-600"} 
                 placeholder-gray-400
                focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                  transition-all duration-300`}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2
                  p-1.5 text-gray-400 hover:text-gray-300
                  rounded-full hover:bg-gray-700/50
                  transition-all duration-300"
                aria-label="Clear search"
              >
                <FiX className="h-5 w-5" />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-3.5 bg-indigo-600 text-white rounded-xl font-medium
              transition-all duration-300
              flex items-center gap-2 
              hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]
              group"
          >
            <FiSearch className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div
          className="flex items-center gap-2 text-red-400 bg-red-900/50 
          px-4 py-3 rounded-lg border border-red-500/50 animate-fadeIn"
        >
          <FiAlertCircle className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {/* Search Hint */}
      {searchTerm.length > 0 && !error && (
        <div className="text-sm text-gray-400 px-4 animate-fadeIn">
          Press Enter or click Search to filter results
        </div>
      )}
    </div>
  );
}

export default TodoSearch;
