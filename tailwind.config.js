/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-cinzel)"],
        sans: ["var(--font-exo)"],
      },
    },
  },
  plugins: [],
};
