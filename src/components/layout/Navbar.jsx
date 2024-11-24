import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FiLogOut, FiInfo, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

function Navbar() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-semibold text-transparent bg-clip-text 
                bg-gradient-to-r from-indigo-400 to-purple-400"
            >
              tasks.ez ✨
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/features"
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                text-gray-300 hover:text-white hover:bg-gray-700 
                transition-colors duration-300"
            >
              <FiInfo className="h-4 w-4" />
              Features
            </Link>

            {currentUser && (
              <>
                <div className="h-6 w-px bg-gray-600"></div>

                <span className="text-gray-300 text-md font-normal select-none">
                  {currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg
                    text-gray-300 hover:text-white
                    hover:bg-gray-700 transition-colors duration-300"
                >
                  <FiLogOut className="h-5 w-5" />
                  Logout
                </button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative text-gray-300 hover:text-white w-10 h-10 flex items-center justify-center"
            >
              <FiMenu
                className={`h-6 w-6 absolute transition-all duration-300 ease-in-out ${
                  isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
              />
              <FiX
                className={`h-6 w-6 absolute transition-all duration-300 ease-in-out ${
                  isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`}
              />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/features"
                className="flex items-center gap-2 px-4 py-2 rounded-lg
                  text-gray-300 hover:text-white hover:bg-gray-700 
                  transition-colors duration-300"
              >
                <FiInfo className="h-4 w-4" />
                Features
              </Link>

              {currentUser && (
                <>
                  <div className="my-2 border-t border-gray-600"></div>

                  <div className="px-4 py-2 text-gray-300 text-md font-normal">
                    {currentUser.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 rounded-lg
                      text-gray-300 hover:text-white
                      hover:bg-gray-700 transition-colors duration-300"
                  >
                    <FiLogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
