/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}","./components/**/*.{ts,tsx}","./public/*.html"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        gold: {
          50:"#FFF8E6",
          200:"#F8E0A6",
          400:"#F4C56A",
          500:"#E8B448",
          600:"#C9992D",
          700:"#8A6615"
        }
      },
      boxShadow: { glow: "0 0 60px rgba(232,180,72,.35)" },
      backgroundImage: {
        cosmic:
          "radial-gradient(1000px 500px at 50% -200px, rgba(232,180,72,.10), transparent 60%)," +
          "radial-gradient(800px 400px at 50% 20%, rgba(255,255,255,.05), transparent 60%)"
      }
    }
  },
  plugins: []
}
