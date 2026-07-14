/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { ink: '#24203b', lavender: '#b9a8e8', lilac: '#b9a8e8', moon: '#fff9ed', cream: '#fff9ed', night: '#29254b' },
      fontFamily: { display: ['Georgia', 'serif'], sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      boxShadow: { cozy: '0 24px 80px rgba(39, 33, 78, .18)' },
    },
  },
  plugins: [],
};
