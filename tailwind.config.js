module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        red: {
          600: '#dc2626', // Add red-600
          700: '#b91c1c', // Add red-700 for hover
        },
      },
    },
  },
  plugins: [],
};