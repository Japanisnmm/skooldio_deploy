/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'star': '#DEF81C',
        'star-empty': '#E1E1E1',
      },
      spacing: {
        '31': '124px',
        '54': '216px',
        '172.21': '172.21px',
      },
      keyframes: {
        dot: {
          '0%, 20%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        loading: {
          '0%': { width: '0%', marginLeft: '0%' },
          '50%': { width: '100%', marginLeft: '0%' },
          '100%': { width: '0%', marginLeft: '100%' }
        },
      },
      animation: {
        dot: 'dot 1.5s infinite',
        'loading-progress': 'loading 1.5s ease-in-out infinite',
      },
      maxWidth: {
        '7xl': '80rem',
      },
    },
  },
  plugins: [
  ],
};
