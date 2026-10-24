/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'system-ui', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
        sans: ['Cairo', 'system-ui', 'sans-serif'],
        heading: ['Cairo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}