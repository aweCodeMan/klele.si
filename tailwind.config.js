module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  //purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: '#181818',
        red: '#FF637B',
        'red-dark': '#E14961',
        beige: '#F9F2E9',
        gray: '#BBBBBB',
        error: "#EA324E",
        'error-washed': "rgba(234, 50, 78, 0.1)"
      },
      fontFamily: {
        'sans': ['Kulim Park', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '2rem',
      },
      typography: {
        DEFAULT: {
          css: {
            lineHeight: '1.5',
          },
        },
      },
    },
    boxShadow: {
      DEFAULT: '4px 4px 0px rgba(0, 0, 0, 0.15);',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
