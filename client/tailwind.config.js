/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#ED1D24', // Uniqlo / AH LEAK signature red
          darkRed: '#D6001C',
          guBlue: '#002B7F',
          guYellow: '#FCD206',
          saleYellow: '#FFE500',
          yellowLight: '#FFF8D6',
          black: '#111111',
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            600: '#4B5563',
            800: '#1F2937',
            900: '#111827'
          }
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Noto Sans Khmer"', '"Kantumruy Pro"', 'sans-serif'],
        khmer: ['"Noto Sans Khmer"', '"Kantumruy Pro"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
