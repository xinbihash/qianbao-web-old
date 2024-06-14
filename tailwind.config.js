/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.vue'],
  prefix: 'tw-',
  theme: {
    extend: {
      spacing: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px'
      }
    }
  },
  plugins: []
}
