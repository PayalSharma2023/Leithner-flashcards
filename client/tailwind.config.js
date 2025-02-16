/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgc: {
          400: "#650743",
          300: "#7F265B",
        },
        yellow: {
          200: "#Ffff00"
        }
      }
    },
  },
  plugins: [],
}