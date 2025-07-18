/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "class", // 기본값 media : 사용자 시스템 설정
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
