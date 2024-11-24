/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "text-gradient": {
          "0%, 100%": {
            "background-size": "200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200%",
            "background-position": "right center",
          },
        },
        ripple: {
          "0%": {
            transform: "scale(0)",
            opacity: 0.7,
          },
          "100%": {
            transform: "scale(4)",
            opacity: 0,
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-out forwards",
        "gradient-xy": "gradient-xy 3s ease-in-out infinite",
        "text-gradient": "text-gradient 1.5s linear infinite",
        ripple: "ripple 0.6s linear forwards",
      },
    },
  },
  plugins: [],
};
