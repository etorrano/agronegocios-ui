/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Verde principal (navbar y elementos clave)
        emerald: {
          50: '#f0f7f0',
          100: '#d4e9d4',
          200: '#a8d3a8',
          300: '#76b976',
          400: '#3d8b3d', // Verde agrícola (navbar ideal)
          500: '#1a5d1a', // Verde oscuro (hover o acentos)
          600: '#134713',
          700: '#0d3a0d',
          800: '#072c07',
          900: '#042004',
        },
        // Toques cálidos (botones, alertas)
        amber: {
          50: '#fff8f0',
          100: '#feedd5',
          200: '#fcdcab',
          300: '#f9c275', // Oro agrícola (ej. iconos de cosecha)
          400: '#f59e0b', // Llamadas a acción
          500: '#d97706', // Hover
          600: '#b45309',
          700: '#8c4a0a',
        },
        // Colores neutros (fondos, texto)
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
        },
      },
    },
  },
  plugins: [],
};
