/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {

      colors:{
        primaryColor:'#222831',
        secondaryColor:'#31363F',
        textColor:'#29A19C',
        text1Color:'#A3F7BF',
        text2Color:'#76ABAE',
        otherColor:'#EEEEEE'

      }
    },
  },
  plugins: [],
  //safelist?
}

