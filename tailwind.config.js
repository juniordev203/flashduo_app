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
        'primary': '#6366F1',
        'black': '#001524',
        'nav_icon_color': '#4f46e5',
        // Màu dùng chung trong các kết quả
        'wrong': '#F29F58', // sai
        'correct': '#88C273' // đúng
      },
    },
  },
  plugins: [],
}