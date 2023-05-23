/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pause: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(170deg)" },
          "100%": { transform: "rotate(170deg)" },
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-pause": "pause 1s linear infinite",
      },
    },
  },
  plugins: [],
};
