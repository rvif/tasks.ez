import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase/config";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { FiArrowRight } from "react-icons/fi";
import PasswordInput from "../utils/PasswordInput";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the oobCode from URL
  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get("oobCode");

  // Verify the code when component mounts
  useEffect(() => {
    async function verifyResetCode() {
      if (!oobCode) {
        setError("Missing reset code. Please use the link from your email.");
        setLoading(false);
        return;
      }

      try {
        // This will verify the code and get the email
        const emailFromCode = await verifyPasswordResetCode(auth, oobCode);
        setEmail(emailFromCode);
        setLoading(false);
      } catch (err) {
        setError("Invalid or expired reset link. Please request a new one.");
        setLoading(false);
      }
    }

    verifyResetCode();
  }, [oobCode]);

  // Add countdown effect after success
  useEffect(() => {
    let timer;
    if (success) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/login");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [success, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Reset the password
      await confirmPasswordReset(auth, oobCode, newPassword);

      setSuccess("Password reset successful!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
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
              Reset Password
            </span>
          </h1>
          <p className="text-gray-400">Enter your new password below</p>
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

          {/* Success Message with Countdown */}
          {success && (
            <div className="space-y-4">
              <div
                className="bg-green-900/10 text-green-400 px-4 py-3 
                rounded-lg border border-green-500/50"
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-sm">{success}</span>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Redirecting to login in</span>
                    <span
                      className="inline-flex items-center justify-center 
                      w-8 h-8 rounded-full bg-gray-700/50 font-mono 
                      text-indigo-400 border border-indigo-500/20"
                    >
                      {countdown}
                    </span>
                    <span>seconds</span>
                  </div>
                </div>
              </div>

              {/* Optional: Skip button */}
              <button
                onClick={() => navigate("/login")}
                className="w-full px-4 py-2 text-sm text-gray-400 
                  hover:text-gray-300 transition-colors duration-300"
              >
                Skip to login →
              </button>
            </div>
          )}

          {!success && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* New Password Input */}
              <PasswordInput
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                label="New Password"
                placeholder="Enter new password"
                autoComplete="new-password"
                minLength={6}
              />

              {/* Confirm Password Input */}
              <PasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm New Password"
                placeholder="Confirm new password"
                autoComplete="new-password"
                minLength={6}
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
                {loading ? "Resetting Password..." : "Reset Password"}
                <FiArrowRight
                  className="h-4 w-4 transition-transform duration-300 
                  group-hover:translate-x-0.5"
                />
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center text-gray-400 text-sm">
            Remember your password?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-400 hover:text-indigo-300 
                transition-colors duration-300 font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
