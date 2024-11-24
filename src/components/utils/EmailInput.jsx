import { FiMail } from "react-icons/fi";

function EmailInput({
  value,
  onChange,
  placeholder = "Enter your email",
  label,
  error,
  required = true,
  name = "email",
  autoComplete = "email",
  className = "",
  disabled = false,
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type="email"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
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
        <FiMail
          className="absolute right-4 top-1/2 -translate-y-1/2 
          text-gray-500 h-4 w-4"
        />
      </div>

      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
}

export default EmailInput;
