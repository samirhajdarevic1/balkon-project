/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#3c0080',
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        },
        navy: '#000080',
        greenyellow: '#adff2f',
        cornflowerbuel: '#6495ed',
        lavander: '#e6e6fa',
        bluebery: '#3B82F6',
      },
      fontFamily: {
        body: ['Nunito'],
      },
      minWidth: {
        350: '350px',
        300: '300px',
        extraSmall: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      maxWidth: {
        375: '375px',
      },
      width: {
        extraSmall: '375',
      },
      screens: {
        extraSmall: '375px',
      },
      zIndex: {
        100: '100',
        1000: '1000',
      },
      top: {
        15: '15%',
      },
    },
  },
  plugins: [],
};
