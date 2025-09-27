/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crypto-green': '#00D4AA',
        'crypto-red': '#FF6B6B',
        'crypto-blue': '#4A90E2',
        'crypto-dark': '#1A1A1A',
        'crypto-gray': '#2D2D2D',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
