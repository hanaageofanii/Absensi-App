/** @type {import('tailwindcss').Config} */
module.exports = {
  // Replace `purge` with `content` in newer Tailwind versions
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
