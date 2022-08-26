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
      'geekThree': "url('https://images.unsplash.com/photo-1579492450119-80542d516179?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
      'CoverCard': "url('https://images.unsplash.com/photo-1579492450119-80542d516179?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"
    },
    colors: {
      'primary': '#F8B532',
      'secondary': '#3B3837',
      'background': '#EFEADE',
      'backgroundTwo': '#F1EFEA',
      'backgroundThree': '#f5f5f5fb',
      'hovers': '#79A988',
      'product': '#FEFDFB',
      'product-hover': '#D9CEB7',
      'test-color': '#616B61',
      'card': '#f3f3f3'
    },
    extend: {},
  },
  plugins: [],
}
