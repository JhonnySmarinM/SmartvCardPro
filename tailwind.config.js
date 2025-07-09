/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1604px",
      },
      colors: {
        secondary: "#767676",
        fondo: "#18181b",
        fondoClaro: "#232326",
        texto: "#f4f4f5",
        acento: "#b91c1c",
        borde: "#27272a",
      },
      fontFamily: {
        secondary: "DM Sans",
      },
    },
  },
  plugins: [],
};
