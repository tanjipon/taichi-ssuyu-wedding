/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      left: {
        '1/20': '5%'
      },
      right: {
        '1/20': '5%'
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
  corePlugins: {
  }
}

