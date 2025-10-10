/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1604px",
      },
      colors: {
        // Colores principales - Tierra y Madurez
        chocolate: {
          50: '#F5F1EF',
          100: '#E8DED9',
          200: '#D1BDB3',
          300: '#BA9C8D',
          400: '#A37B67',
          500: '#5C4033', // Marrón Chocolate principal
          600: '#4A3329',
          700: '#37261F',
          800: '#251914',
          900: '#120D0A',
        },
        carbon: {
          50: '#F0F2F3',
          100: '#DDE1E4',
          200: '#BBC3C9',
          300: '#99A5AE',
          400: '#778793',
          500: '#36454F', // Gris Carbón principal
          600: '#2B373F',
          700: '#20292F',
          800: '#161C20',
          900: '#0B0E10',
        },
        // Acentos vibrantes - Lujo y detalle
        fucsia: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#E91E63', // Fucsia vibrante
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        },
        turquesa: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#00BCD4', // Turquesa vibrante
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        // Aliases para compatibilidad
        secondary: "#778793",
        fondo: "#36454F",
        fondoClaro: "#5C4033",
        texto: "#F5F1EF",
        acento: "#E91E63",
        borde: "#4A3329",
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #5C4033 0%, #36454F 100%)',
        'gradient-luxury-reverse': 'linear-gradient(135deg, #36454F 0%, #5C4033 100%)',
        'gradient-fucsia': 'linear-gradient(135deg, rgba(233, 30, 99, 0.1) 0%, transparent 100%)',
        'gradient-turquesa': 'linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, transparent 100%)',
      },
      boxShadow: {
        'luxury': '0 10px 40px rgba(92, 64, 51, 0.3)',
        'luxury-lg': '0 20px 60px rgba(92, 64, 51, 0.4)',
        'glow-fucsia': '0 0 20px rgba(233, 30, 99, 0.3)',
        'glow-turquesa': '0 0 20px rgba(0, 188, 212, 0.3)',
      },
      fontFamily: {
        secondary: "DM Sans",
      },
    },
  },
  plugins: [],
};
