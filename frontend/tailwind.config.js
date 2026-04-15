/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alegreya: ['"Alegreya Sans SC"', 'sans'],
        source: ['"Source Sans 3"', 'sans'],
        raleway: ['"Raleway"', 'serif']
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.7s ease-out'
      }
    },
  },
  plugins: [ require('@tailwindcss/forms') ]
}
