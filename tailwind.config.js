/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EC',
        'cream-dark': '#EFE9DD',
        charcoal: '#2A2118',
        clay: {
          DEFAULT: '#D98F4E',
          dark: '#C77A3A',
          light: '#F2C99B',
        },
        sage: '#EFF0E6',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'ui-rounded', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
