/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify all files Tailwind should scan for class names
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      // Custom colors
      colors: {
        brand: {
          900: "#1f2340", // Deep navy shade for primary text or elements
          800: "#2b2f4a"  // Slightly lighter navy for secondary accents
        },
        soft: "#f4efe7"   // Light background color
      },

      // Custom keyframes for animations
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(8px)" }, // Start invisible and slightly lower
          "100%": { opacity: 1, transform: "translateY(0)" }  // End fully visible and in place
        }
      },

      // Custom animation utilities
      animation: {
        fadeIn: "fadeIn 250ms ease-out" // Shortcut to use fadeIn animation in components
      }
    }
  },

  // Plugins array for any Tailwind plugins (currently empty)
  plugins: []
};