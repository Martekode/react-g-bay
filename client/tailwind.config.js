/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{js,jsx}","./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      'bangers': ['"Bangers"', 'cursive'],
      'faster-one': ['"Faster One"', 'cursive']
    },
    backgroundImage: {
      'geek': "url('https://wallpaperaccess.com/full/303589.jpg')",
      'geekTwo': "url('https://www.geekculture.com/blurbs/geekbay/geekbayimages/geekbaylogo.gif')",
    },
    colors: {
      'primary': '#F8B532',
      'secondary': '#3B3837',
      'background': '#EFEADE',
      'hovers': '#79A988',
      'product': '#FEFDFB',
      'product-hover': '#D9CEB7',
      'test-color': '#616B61'
    },
    extend: {},
  },
  plugins: [],
}
