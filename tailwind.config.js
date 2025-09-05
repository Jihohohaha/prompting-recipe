// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Noto Sans KR', 'Roboto', 'Helvetica Neue', 'Arial'],
        stretch: ['"StretchPro"', "sans-serif"],
        desira: ['"DesiraDEMO"', "sans-serif"],
        pretendard: ['"Pretendard"', "sans-serif"],
        michroma: ['"Michroma"', "monospace"],
        neodgm: ['"Neodgm"', "monospace"],
        bromawo: ['"Bromawo"', "sans-serif"],
      },
    },
  },
  plugins: [],
}