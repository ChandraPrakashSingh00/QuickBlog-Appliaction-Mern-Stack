/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#007bff', // 👈 yahan primary color set karo (jo bhi chahiye)
      },
    },
  },
  plugins: [],
}
