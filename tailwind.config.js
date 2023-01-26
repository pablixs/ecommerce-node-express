/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('@tailwindcss/forms'),
    require("daisyui"),
  ],
  content: ["./node_modules/flowbite/**/*.js"],
  daisyui: {
    themes: ["garden"]
  }
}
