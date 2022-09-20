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
      colors: {
        current: 'currentColor',
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
