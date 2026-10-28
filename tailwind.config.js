/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: { extend: { fontFamily: { sans: ['Vazirmatn', 'Tahoma', 'sans-serif'] }, colors: { ink: '#19162f', mint: '#8eedc6', coral: '#ff705c', lilac: '#ae9dff', cream: '#faf7ef' }, boxShadow: { glow: '0 0 80px rgba(142,237,198,.14)' } } },
  plugins: [],
};
