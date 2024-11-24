import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import EmailInput from "../utils/EmailInput";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
    } catch (err) {
      setError("Failed to reset password: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-2xl font-bold tracking-tight">
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r 
              from-indigo-400 via-purple-400 to-indigo-400 animate-gradient"
            >
              Forgot Password
            </span>
          </h1>
          <p className="text-gray-400">
            Enter your email to receive reset instructions
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 
          border-2 border-gray-700/50"
        >
          {/* Error Message */}
          {error && (
            <div
              className="mb-6 bg-red-900/10 text-red-400 px-4 py-3 
              rounded-lg border border-red-500/50 flex items-center gap-2"
            >
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div
              className="mb-6 bg-green-900/10 text-green-400 px-4 py-3 
              rounded-lg border border-green-500/50 flex items-center gap-2"
            >
              <span className="text-sm">{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="Enter your email"
              error={error}
              required={true}
              disabled={loading}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl 
                font-medium transition-all duration-300
                hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]
                disabled:bg-gray-700 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 group"
            >
              {loading ? "Sending Reset Link..." : "Send Reset Link"}
              <FiArrowRight
                className="h-4 w-4 transition-transform duration-300 
                group-hover:translate-x-0.5"
              />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-gray-400 text-sm">
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 text-indigo-400 
                hover:text-indigo-300 transition-colors duration-300 font-medium group"
            >
              <FiArrowLeft
                className="h-4 w-4 transition-transform duration-300 
                group-hover:-translate-x-0.5"
              />
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
