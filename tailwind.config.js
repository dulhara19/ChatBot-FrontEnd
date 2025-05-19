/** @type {import('tailwindcss').Config} */

import { blackA, mauve, slate, tomato, green } from '@radix-ui/colors';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...mauve,
        ...slate,
        ...tomato,
        ...green,
      },
    },
  },
  plugins: [],
};
