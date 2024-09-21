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
      }
    },
  },
  plugins: [ require('@tailwindcss/forms') ]
}
