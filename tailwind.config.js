/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        stretch: ['"StretchPro"', "sans-serif"],
        desira: ['"DesiraDEMO"', "sans-serif"],
        pretendard: ['"Pretendard"', "sans-serif"],
        michroma: ['"Michroma"', "monospace"],
        neodgm: ['"Neodgm"', "monospace"],
      },
    },
  },
  plugins: [],
};