/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2CB1A6',
        darkblue: '#0E1B3D',
        brandTeal: '#52B5BD',
        brandBlue: '#2F4A7D',
        brandCoral: '#E07A5F',
        brandMint: '#A6EACB',
      },
      fontFamily: {
        Manrope: ['Manrope', 'sans-serif'],
        secondary: ['Work Sans', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
