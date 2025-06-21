/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'la-ai': {
          50: '#f0f9fa',
          100: '#d9f0f2',
          200: '#b7e2e6',
          300: '#8bcdd4',
          400: '#5a9ea6',
          500: '#5a9ea6',
          600: '#4a8289',
          700: '#3d6a70',
          800: '#345559',
          900: '#2d484c',
        },
        'la-ai-red': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#b83c3c',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
