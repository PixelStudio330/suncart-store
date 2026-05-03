/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dragonfruit: "#D64076", 
        tangerine: "#FF8C42",
        sun: "#EAA624",
        hibiscus: "#C85555",
        teal: "#008080",
      },
    },
  },
  plugins: [],
};