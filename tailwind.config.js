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
        'light-gray': "#F3F3F3",
        error: "#EA324E",
        orange: '#FF9314',
        green: '#79CE82',
        blue: '#0E9FF0',
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
            a: {
              color: '#FF637B',
              '&:hover': {
                color: '#E14961',
              },
            },
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
