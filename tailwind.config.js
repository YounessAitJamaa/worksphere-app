/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './js/**/*/js'
  ],
  theme: {
    extend: {
      colors : {
        greenButton : '#08CB00',
        yellowButton : '#FAB12F',
      }
    },
  },
  plugins: [],
}

