import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="w-full max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Large 404 */}
          <h1
            className="text-[120px] sm:text-[180px] font-bold leading-none
            tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 
            text-transparent bg-clip-text animate-gradient"
          >
            404
          </h1>

          {/* Text Content */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              Page Not Found
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Button */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 
              bg-indigo-500/10 text-indigo-400 rounded-xl font-medium
              transition-all duration-300 border border-indigo-500/20
              hover:bg-indigo-500/20 hover:border-indigo-500/30
              group mt-4"
          >
            <FiHome
              className="h-5 w-5 transition-transform duration-300 
              group-hover:-translate-x-0.5"
            />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
