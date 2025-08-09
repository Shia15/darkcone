// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      borderRadius: {
        xl: "var(--radius)",
        "2xl": "calc(var(--radius) * 1.25)",
      },
    },
  },
  plugins: [],
};