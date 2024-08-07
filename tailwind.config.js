/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      "manrope-regular": ["manrope-regular"],
      "manrope-medium": ["manrope-medium"],
      "manrope-semibold": ["manrope-semibold"],
      "manrope-bold": ["manrope-bold"]
    },
    extend: {
      animation: {
        selectedForward: 'selectedForward 0.5s cubic-bezier(.85,.12,.82,.33) ',
        popOut:'popOut 0.3s cubic-bezier(0.19, 0.91, 0.18, 0.91)'
      },
      keyframes: {
        selectedForward: {
          '0%': {
            textShadow: '0px 0px 20px rgb(255 45 106/90)',
            color: 'rgb(255 45 106)'
          },
          '75%': {
            textShadow: '0px 0px 1px rgb(255 45 106/ 0)'
          },
          '100%': {
            color: 'rgb(0 0 0 / 0.5)'
          }
        },
        popOut:{
          '0%':{
            transform:' scale(0)'
          },
          '100%':{
          }
        }
      }
    },

  },
  plugins: [],
}

