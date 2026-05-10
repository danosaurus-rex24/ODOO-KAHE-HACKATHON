/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#033F48",
        secondary: "#0F5C6E",
        accent: "#A7C92F",
        muted: "#6C946D",
        light: "#B7BDC6",
      },
    },
  },
  plugins: [],
};