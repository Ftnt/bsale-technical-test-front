/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  "./main.js"],
  theme: {
    extend: {},
    colors:{
      white : "#fff",
      black : "#000",
      purple: {
        0: "#3d2967",
        1: "#675294",
        2: "#a38fce",
        3: "#e0d5f9",
        100: "#a38fce6c",
      },
      yellow: {
        0: "#f2bc1b",
        1: "#efcb5e",
        2: "#ffeebb",
        3: "#fff8e4",
        100: "#ffeebb6c",
      },
      gray: {
        0: "#595a60",
        1: "#96969f",
        2: "#d3d3d3",
        3: "#efefef",
        4: "#f4f4f4",
        100: "#d3d3d36c",
      },
      pink: {
        0: "#f21d81",
        1: "#f161a5",
        2: "#ffc6e1",
        3: "#ffe7f2",
        100: "#ffc6e16c",
      }
    }
  },
  plugins: [],
}
