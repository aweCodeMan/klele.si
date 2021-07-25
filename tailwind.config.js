module.exports = {
  //purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: '#FF637B',
        beige: '#F9F2E9',
      },
      fontFamily: {
        'sans': ['Kulim Park', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '2rem',
      }
    },
    boxShadow: {
      DEFAULT: '4px 4px 0px rgba(0, 0, 0, 0.15);'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
