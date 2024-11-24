import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodo } from "../../contexts/TodoContext";
import { FiX, FiSave } from "react-icons/fi";

function TodoUpdate() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { todos, updateTodo } = useTodo();
  const navigate = useNavigate();

  useEffect(() => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    } else {
      setError("Todo not found");
    }
  }, [id, todos]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await updateTodo(id, {
        title: title.trim(),
        description: description.trim(),
      });
      navigate("/");
    } catch (err) {
      setError("Failed to update todo: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient">
            Update Task
          </h2>

          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-900/50 border border-red-500/50 text-red-400">
              {error}
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
                  text-gray-100 focus:outline-none focus:border-indigo-500
                  transition-colors duration-300"
                placeholder="Enter task title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border-2 border-gray-600 
                  text-gray-100 focus:outline-none focus:border-indigo-500
                  transition-colors duration-300"
                rows="4"
                placeholder="Enter task description"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-4 py-2 rounded-lg border-2 border-gray-600 text-gray-300
                  hover:bg-gray-700 transition-colors duration-300
                  flex items-center gap-2"
              >
                <FiX className="h-5 w-5" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg
                  hover:bg-indigo-700 transition-colors duration-300
                  flex items-center gap-2
                  disabled:bg-indigo-800 disabled:cursor-not-allowed"
              >
                <FiSave className="h-5 w-5" />
                {loading ? "Updating..." : "Update Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TodoUpdate;
