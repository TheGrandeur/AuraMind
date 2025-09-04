module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#1f2340", // deep navy
          800: "#2b2f4a"
        },
        soft: "#f4efe7"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        }
      },
      animation: {
        fadeIn: "fadeIn 250ms ease-out"
      }
    }
  },
  plugins: []
};