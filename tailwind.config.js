module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-lato)', '"Open Sans"', 'sans-serif'],
        body: ['var(--font-noto-sans)', 'sans-serif'],
      },
      borderWidth: {
        6: '6px',
      },
      colors: {
        basic: {
          gray: '#333',
          white: '#fff',
          darkgray: '#444',
        },
        accent: {
          main: '#26374A',
          error: '#d3080c',
          warning: '#ee7100',
          info: '#269abc',
          selected: '#333',
          success: '#278400',
        },
        red: {
          light: '#f3e9e8',
          dark: '#d3080c',
        },
        link: {
          default: '#2b4380',
          selected: '#0535d2',
          visited: '#7834bc',
        },
        blue: {
          light: '#335075',
          normal: '#1c578a',
          default: '#091c2d',
          dark: '#26374a',
          deep: '#2e5274',
          active: '#16446c',
        },
        gray: {
          light: '#e1e4e7',
          lighter: '#f8f8f8',
          normal: '#eaebed',
          default: '#dcdee1',
          dark: '#cfd1d5',
          deep: '#bbbfc5',
          modal: '#999999',
        },
        orange: {
          dark: '#e59700',
        },
      },
      backgroundImage: () => ({
        'footer-parliament-image': 'url(../../public/landscape.png)',
        'splash-page': 'url(../../public/sp-bg-1.jpg)',
      }),
      boxShadow: {
        card: '0px 2px 8px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
