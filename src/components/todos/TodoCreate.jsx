import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../../contexts/TodoContext";
import { useAuth } from "../../contexts/AuthContext";
import { FiSave, FiX, FiAlertCircle } from "react-icons/fi";

function TodoCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { addTodo } = useTodo();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await addTodo({
        title: title.trim(),
        description: description.trim(),
      });
      navigate("/");
    } catch (err) {
      setError("Failed to create todo: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient">
              Create New Task
            </span>
          </h2>
          <p className="text-gray-400 font-normal text-lg">
            Add a new task to your list
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 shadow-lg border-2 border-gray-700">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-900/50 border border-red-500/50 text-red-400 flex items-center gap-2">
              <FiAlertCircle className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border-2 border-gray-600 
                  text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                  transition-all duration-300"
                placeholder="What needs to be done?"
                maxLength={150}
                required
              />
              <div className="text-right mt-1">
                <span
                  className={`text-xs transition-colors duration-200 
                    ${
                      title.length > 135 // Check 90% first
                        ? "text-red-400"
                        : title.length > 112 // Then check 75%
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                >
                  {title.length}/150
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border-2 border-gray-600 
                  text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                  transition-all duration-300 resize-none"
                rows="4"
                placeholder="Add some details about your task..."
                maxLength={400}
              />
              <div className="text-right mt-1">
                <span
                  className={`text-xs transition-colors duration-200 
                    ${
                      description.length > 360 // Check 90% first
                        ? "text-red-400"
                        : description.length > 300 // Then check 75%
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                >
                  {description.length}/400
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 rounded-lg border-2 border-gray-600 text-gray-300
                  hover:bg-gray-700/50 hover:border-gray-500/50
                  transition-all duration-300
                  flex items-center gap-2 group"
              >
                <FiX className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg
                  transition-all duration-300
                  flex items-center gap-2
                  disabled:bg-indigo-800 disabled:cursor-not-allowed
                  hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]
                  group"
              >
                <FiSave className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                {loading ? "Creating..." : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TodoCreate;
