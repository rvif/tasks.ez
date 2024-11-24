import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

function PasswordInput({
  value,
  onChange,
  placeholder = "Enter password",
  label,
  error,
  required = true,
  minLength = 6,
  name,
  autoComplete = "current-password",
  className = "",
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          disabled={disabled}
          className={`w-full pl-4 pr-12 py-2.5 bg-gray-900 
            border-2 ${error ? "border-red-500/50" : "border-gray-700/50"}
            rounded-lg text-gray-100 placeholder-gray-500
            focus:outline-none focus:border-indigo-500/50 
            transition-colors duration-300
            disabled:bg-gray-800 disabled:cursor-not-allowed
            ${className}`}
          placeholder={placeholder}
        />

        <div className="absolute right-0 top-0 h-full flex items-center">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="px-3 h-full text-gray-500 hover:text-gray-300
              transition-colors duration-300 focus:outline-none
              disabled:cursor-not-allowed disabled:opacity-50"
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FiEyeOff className="h-4 w-4" />
            ) : (
              <FiEye className="h-4 w-4" />
            )}
          </button>
          <div className="h-full w-px bg-gray-700/50" />
          <FiLock className="h-4 w-4 text-gray-500 mx-3" />
        </div>
      </div>

      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
}

export default PasswordInput;
