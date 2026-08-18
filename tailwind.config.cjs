module.exports = {
  content: [
    './src/**/*.{astro,html,js,ts,jsx,tsx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F2D1E',
        secondary: '#B88A44',
        background: '#F9F7F2',
        textdark: '#111827',
        accent: '#D7C4A3'
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
