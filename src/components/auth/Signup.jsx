import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FiUserPlus } from "react-icons/fi";
import EmailInput from "../utils/EmailInput";
import PasswordInput from "../utils/PasswordInput";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      navigate("/");
    } catch (err) {
      setError("Email already in use");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header section remains the same */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold tracking-tight text-center select-none">
            <span
              className="text-transparent bg-clip-text animate-text-gradient
              bg-[size:200%] bg-gradient-to-r 
              from-cyan-500 via-purple-500 via-pink-500 
              via-violet-500 via-purple-500 to-cyan-500"
            >
              Create Account
            </span>
          </h2>
          <p className="text-gray-400 font-normal text-lg">
            Join us and start organizing your tasks
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 shadow-lg border-2 border-gray-700">
          {error && (
            <div
              className="mb-6 bg-red-900/10 text-red-400 px-4 py-3 
              rounded-lg border border-red-500/50"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter your email"
            />

            <div className="space-y-1">
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="Create your password"
                autoComplete="new-password"
                minLength={6}
              />
              <p className="text-sm text-gray-400">
                Must be at least 6 characters
              </p>
            </div>

            <PasswordInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              minLength={6}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl 
                font-medium transition-all duration-300
                hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]
                disabled:bg-gray-700 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 group"
            >
              {loading ? (
                "Creating Account..."
              ) : (
                <>
                  <FiUserPlus className="h-4 w-4" />
                  Create Account
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
