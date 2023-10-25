/* eslint-disable no-undef */
import konstaConfig from 'konsta/config';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
// convert code above to type ir interface


export default konstaConfig({
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],

  konsta: {
    colors: {
      kred: '#ff0000',
      kyellow: '#ffff00',
    }
  },

  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#1e69ff',
        'white-1': '#f5f5f5',
        'neutral-1': '#757575',
      },
    },
  },

  plugins: [require("daisyui")],
})
