import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import konstaConfig from 'konsta/config'

/** @type {import('tailwindcss').Config} */

export default konstaConfig({
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#1e69ff',
        'white-1': '#f5f5f5',
        'neutral-1': '#757575'
      }
    },
  },

  plugins: [forms],
})
