/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          playfair: ['Playfair Display', 'serif'],
          cormorant: ['"Cormorant Garamond"', 'serif'],
          ebgaramond: ['"EB Garamond"', 'serif'],
          lora: ['Lora', 'serif'],
          amiri: ['Amiri', 'serif'],
          marheya: ['Marhey', 'cursive'],
        },
        
    },

  },
  plugins: [],
}