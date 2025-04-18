/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app.jsx",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    }
  },
  plugins: [],
}

