"use strict";

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @type {import('tailwindcss').Config} */
module.exports = (_module$exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {}
  },
  plugins: [require("@tailwindcss/typography"), require('@tailwindcss/forms'), require("daisyui")]
}, _defineProperty(_module$exports, "content", ["./node_modules/flowbite/**/*.js"]), _defineProperty(_module$exports, "daisyui", {
  themes: ["garden"]
}), _module$exports);