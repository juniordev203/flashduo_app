/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#17a2b8',
        'lightBackground': '#DDEAF0',
        'secondary': '#F7A072',
        'purple': '#8e44ad',
        'black': '#001524',
        // Màu dùng chung trong các kết quả
        'wrong': '#F29F58', // sai
        'correct': '#88C273' // đúng
      },
    },
  },
  plugins: [],
}