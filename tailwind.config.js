/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#1182c5",
        secondary: "#2aa6df",
        dark: "#1e1e1e",
        light: "#f5f5f5",
      },
      keyframes: {
        slide: {
          '0%, 100%': { transform: 'translateX(0)' },
          '33%': { transform: 'translateX(-100%)' },
          '66%': { transform: 'translateX(-200%)' },
        },
      },

      animation: {
        slide: 'slide 12s ease-in-out infinite',
      },
      
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },


    },
  },
  plugins: [],
}

