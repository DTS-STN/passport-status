module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Lato', 'sans-serif'],
        body: ['Noto sans', 'sans-serif'],
        extra: ['Patua One', 'cursive'],
      },
      borderWidth: {
        6: '6px',
      },
      colors: {
        basic: {
          gray: '#333',
          white: '#fff',
        },
        accent: {
          main: '#26374A',
          error: '#d3080c',
          warning: '#ee7100',
          info: '#269abc',
          slected: '#333',
        },
        red: {
          light: '#f3e9e8',
          dark: '#d3080c',
        },
        link: {
          default: '#2b4380',
          slected: '#0535d2',
          visited: '#7834bc',
        },
        blue: {
          light: '#335075',
          normal: '#1c578a',
          default: '#091c2d',
          dark: '#26374a',
          deep: '#26374a',
        },
        gray: {
          light: '#f8f8f8',
          normal: '#eaebed',
          default: '#dcdee1',
          dark: '#cfd1d5',
          deep: '#bbbfc5',
        },
      },
      backgroundImage: () => ({
        'footer-parliament-image': 'url(../public/landscape.png)',
        // 'splash-page': 'url(../public/sp-bg-1.jpg)',
      }),
      boxShadow: {
        card: '0px 2px 8px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
