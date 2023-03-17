const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightsky: {
          // BMW M LIGHT BLUE
          50: "#f2f9ff",
          100: "#e6f3ff",
          200: "#cde7ff",
          300: "#b3dcff",
          400: "#9ad0ff",
          500: "#81c4ff",
          600: "#679dcc",
          700: "#4d7699",
          800: "#344e66",
          900: "#1a2733"
        },
        yale: {
          // BMW M DARK BLUE
          50: "#e8eef4",
          100: "#d0dee8",
          200: "#a2bcd2",
          300: "#739bbb",
          400: "#4579a5",
          500: "#16588e",
          600: "#124672",
          700: "#0d3555",
          800: "#092339",
          900: "#04121c"
        },
        crimson: {
          // BMW M RED
          50: "#fde9ea",
          100: "#fad3d5",
          200: "#f5a7ab",
          300: "#f17a82",
          400: "#ec4e58",
          500: "#e7222e",
          600: "#b91b25",
          700: "#8b141c",
          800: "#5c0e12",
          900: "#2e0709"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans]
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
