/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text-color': '#FFF', 
        'text-alt-color': 'rgba(255, 246, 229, 0.65)',
        'background-color': '#272325', 
        'background-background-color': '#3A4E53', 
        'background-alt-color': '#314448', 
        'background-alt2-color': '#07657D', 
        'border-color': '#FFF6E6', 
        'border-alt-color': 'rgba(255, 246, 229, 0.35)', 
        'link-color': '#ffd500', 
      },
      spacing: {
        'spacing': '20px',
        'half-spacing': '10px',
        'quarter-spacing': '5px',
        'double-spacing': '40px',
      },
    },
  },
  plugins: [],
}
