/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    'bg-dark',
    'text-primary',
    'bg-graphite',
    'text-secondary',
    'font-heading',
    'font-sans'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700',    // Dourado Bat Signal
        secondary: '#0DF5E3',  // Azul AXK
        dark: '#000000',       // Preto absoluto
        graphite: '#1A1A1A',   // Cinza grafite
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
