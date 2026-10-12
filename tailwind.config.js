/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Sharp corporate look: no rounded corners anywhere
    borderRadius: { none: '0', sm: '0', DEFAULT: '0', md: '0', lg: '0', xl: '0', '2xl': '0', '3xl': '0', full: '0' },
    extend: {
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Lexend', 'system-ui', 'sans-serif'],
      },
      // Colors taken from the Manas logo
      colors: {
        brand: { DEFAULT: '#E2231A', dark: '#B51A12', light: '#FDECEA' },
        ink: '#101828',
        steel: '#6B7076',
        sky: { 50: '#F3F8FD', 100: '#DCEAF9', 200: '#BFD8F3', 300: '#9CC3EC' },
        page: '#F9FAFC',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: { marquee: 'marquee 35s linear infinite' },
    },
  },
  plugins: [],
}
