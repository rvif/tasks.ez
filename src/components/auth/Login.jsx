import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FiLogIn } from "react-icons/fi";
import EmailInput from "../utils/EmailInput";
import PasswordInput from "../utils/PasswordInput";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
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
              Welcome Back
            </span>
          </h2>
          <p className="text-gray-400 font-normal text-lg">
            Let's pick up where you left off
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

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-400 hover:text-indigo-300 
                  transition-colors duration-300"
              >
                Forgot Password?
              </Link>
            </div>

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
                "Signing in..."
              ) : (
                <>
                  <FiLogIn className="h-4 w-4" />
                  Sign in
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center">
          <p className="text-gray-400">
            Need an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
