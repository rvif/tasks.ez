import { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import confetti from "canvas-confetti";
import useSound from "use-sound";
import { formatDistanceToNow } from "date-fns";

const completeSoundUrl = "/sounds/complete.mp3";
const uncompleteSoundUrl = "/sounds/uncomplete.mp3";

function TodoItem({ todo, onDelete, onEdit, onToggleComplete }) {
  // Convert title and description to strings if they're arrays
  const todoTitle = Array.isArray(todo.title)
    ? todo.title.join("")
    : todo.title || "";

  const todoDescription = Array.isArray(todo.description)
    ? todo.description.join("")
    : todo.description || "";

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todoTitle);
  const [editedDescription, setEditedDescription] = useState(todoDescription);

  // Sound effects
  const [playComplete] = useSound(completeSoundUrl, { volume: 0.4 });
  const [playUncomplete] = useSound(uncompleteSoundUrl, { volume: 0.3 });

  // Confetti effect
  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 1.1 },
      gravity: 1.5,
      scalar: 1.2,
      colors: ["#818CF8", "#6366F1", "#4F46E5"],
    });
  };

  const handleToggleComplete = async () => {
    try {
      await onToggleComplete(todo.id);
      if (!todo.completed) {
        playComplete();
        triggerConfetti();
      } else {
        playUncomplete();
      }
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!todo.id) {
        console.error("Todo ID is missing!");
        return;
      }

      if (editedTitle.trim() === "") {
        return; // Don't submit if title is empty
      }

      await onEdit(todo.id, {
        title: editedTitle.trim(),
        description: editedDescription.trim(),
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Format date helper using date-fns
  const formatDate = (timestamp) => {
    if (!timestamp) return "Date not available";

    try {
      // Handle Firestore Timestamp
      if (timestamp && typeof timestamp.toDate === "function") {
        return formatDistanceToNow(timestamp.toDate(), { addSuffix: true });
      }

      // Handle string timestamp
      if (typeof timestamp === "string") {
        // Parse the specific format: "24 November 2024 at 02:20:35 UTC+5:30"
        const date = new Date(timestamp.split(" at ")[0]);
        if (!isNaN(date.getTime())) {
          return formatDistanceToNow(date, { addSuffix: true });
        }
      }

      // Handle regular Date object or timestamp
      const date = new Date(timestamp);
      if (!isNaN(date.getTime())) {
        return formatDistanceToNow(date, { addSuffix: true });
      }

      return "Invalid date";
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Date error";
    }
  };

  return (
    <div className="relative">
      <div
        className={`group flex gap-3 p-3 rounded-xl 
        bg-gray-800/50 border-2 border-gray-700/50 
        transition-all duration-300
        ${todo.completed ? "opacity-90" : "hover:border-indigo-500/50"}`}
      >
        {/* Checkbox */}
        <button
          onClick={handleToggleComplete}
          className={`relative h-6 w-6 rounded-full border-2 
            transition-all duration-300 flex-shrink-0 mt-0.5
            ${
              todo.completed
                ? "border-green-500"
                : "border-gray-600 hover:border-indigo-500"
            }`}
          aria-label={
            todo.completed ? "Mark as incomplete" : "Mark as complete"
          }
        >
          <span
            className={`absolute inset-0.5 rounded-full 
            transform transition-all duration-300
            ${
              todo.completed
                ? "scale-100 bg-green-500"
                : "scale-0 bg-indigo-500"
            }`}
          />
        </button>

        {/* Todo Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full bg-gray-700 px-3 py-2 rounded-lg 
                    border-2 border-gray-600 focus:border-indigo-500 
                    focus:outline-none text-gray-200"
                  autoFocus
                  maxLength={150}
                />
                <div className="text-right mt-1">
                  <span
                    className={`text-xs transition-colors duration-200 
                    ${
                      editedTitle.length > 135
                        ? "text-red-400"
                        : editedTitle.length > 112
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                  >
                    {editedTitle.length}/150
                  </span>
                </div>
              </div>

              <div>
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full bg-gray-700 px-3 py-2 rounded-lg 
                    border-2 border-gray-600 focus:border-indigo-500 
                    focus:outline-none text-gray-200 min-h-[60px] resize-none"
                  maxLength={400}
                />
                <div className="text-right mt-1">
                  <span
                    className={`text-xs transition-colors duration-200 
                    ${
                      editedDescription.length > 360
                        ? "text-red-400"
                        : editedDescription.length > 300
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                  >
                    {editedDescription.length}/400
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTitle(todoTitle);
                    setEditedDescription(todoDescription);
                  }}
                  className="px-3 py-1 text-sm text-gray-400 hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-sm bg-indigo-500 text-white rounded-md
                    hover:bg-indigo-400 transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <h3
                  className={`font-medium text-base transition-all duration-300 
                  break-words overflow-hidden
                  ${todo.completed ? "text-gray-400" : "text-gray-200"}`}
                >
                  {todoTitle}
                </h3>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1.5 text-gray-400 hover:text-indigo-400 
                      transition-colors duration-300"
                    aria-label="Edit todo"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="p-1.5 text-gray-400 hover:text-red-400 
                      transition-colors duration-300"
                    aria-label="Delete todo"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div
                className="h-[1px] bg-gradient-to-r 
                from-transparent 
                via-indigo-500/70 
                to-transparent 
                shadow-sm shadow-indigo-500/20"
              />

              {todoDescription && (
                <p
                  className={`text-sm transition-all duration-300 
                  break-words whitespace-pre-wrap overflow-hidden
                  ${todo.completed ? "text-gray-500" : "text-gray-400"}`}
                >
                  {todoDescription}
                </p>
              )}

              <div className="flex items-center gap-3 mt-1">
                <span className="text-[11px] text-gray-500 truncate">
                  {todo.createdAt
                    ? `Created ${formatDate(todo.createdAt)}`
                    : "No creation date"}
                </span>
                <span className="text-gray-500">·</span>
                {todo.updatedAt && todo.updatedAt !== todo.createdAt && (
                  <span className="text-[11px] text-gray-500 truncate">
                    Updated {formatDate(todo.updatedAt)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
