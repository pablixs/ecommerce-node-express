/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', 
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("@tailwindcss/typography"),
    require('@tailwindcss/forms'),
    require("daisyui"),
  ],
  daisyui: {
    themes: ["garden"]
  }
}
