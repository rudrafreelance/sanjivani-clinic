/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F8F4',
        'cream-dark': '#E3E9D8',
        charcoal: '#1A2E24',
        forest: {
          DEFAULT: '#1C4A36',
          dark: '#133528',
          light: '#2D6B4A',
        },
        leaf: {
          DEFAULT: '#4E9A3C',
          light: '#EAF5E3',
        },
        gold: {
          DEFAULT: '#C5A04A',
          dark: '#9E7E2E',
          light: '#E8D5A3',
        },
        clay: {
          DEFAULT: '#C5A04A',
          dark: '#9E7E2E',
          light: '#E8D5A3',
        },
        sage: '#E8F0DC',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Montserrat"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
