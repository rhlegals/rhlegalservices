/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef2f9',
          100: '#d5e0f0',
          200: '#afc4e3',
          300: '#7ea0d0',
          400: '#4f7bbc',
          500: '#3460a5',
          600: '#264d8a',
          700: '#1d3b6e',
          800: '#162d55',
          900: '#0f1f3d',
          950: '#091529',
        },
        // Brand primary: Official Crimson — every shade resolves to #A61A32
        brand: {
          50:  '#a61a32',
          100: '#a61a32',
          200: '#a61a32',
          300: '#a61a32',
          400: '#a61a32',
          500: '#a61a32',
          600: '#8c1529',
          700: '#731121',
          800: '#5a0d1a',
          900: '#420a13',
          950: '#2b060c',
        },
        // Brand secondary: Deep Purple R:99 G:24 B:86
        accent: {
          50:  '#f8eef6',
          100: '#efd5ea',
          200: '#deaf d5',
          300: '#c478b8',
          400: '#a44e98',
          500: '#631856',
          600: '#561449',
          700: '#46103c',
          800: '#360c2e',
          900: '#260820',
          950: '#180514',
        },
        // Brand gray R:109 G:110 B:113
        slate: {
          400: '#9ca3af',
          500: '#6d6e71',
          600: '#565759',
          700: '#404142',
          800: '#2a2b2c',
          900: '#141415',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
