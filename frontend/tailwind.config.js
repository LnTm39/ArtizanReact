const { nextui } = require('@nextui-org/react')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  darkMode: 'class',
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            50: '#fbf5fe',
            100: '#f7eafd',
            200: '#f0d4fa',
            300: '#e5b2f5',
            400: '#d784ee',
            500: '#bb40dd',
            600: '#a935c4',
            700: '#8e29a2',
            800: '#752385',
            900: '#63226d',
            950: '#3f0a48'
          }
        }
      },
      dark: {
        colors: {
          primary: {
            50: '#f1fdf0',
            100: '#dbfddb',
            200: '#b9f9b9',
            300: '#70f072',
            400: '#46e249',
            500: '#1dca21',
            600: '#12a715',
            700: '#128315',
            800: '#146716',
            900: '#125516',
            950: '#042f07'
          }
        }
      }
    }
  })]
}
