/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./src/views/*.ejs"],
  content: ["./src/**/*.{html,js,ejs}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
