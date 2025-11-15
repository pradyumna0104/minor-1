/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Slack-inspired palette
        // 'slack-primary': '#4A154B',
        'slack-primary': '#00C853',
        // 'slack-accent': '#36C5F0',
        'slack-accent': '#00E676',
        'slack-sidebar': '#3F0E40',
        // 'slack-text': '#D1D2D3',
        'slack-text': '#1B1B1B',
      },
    },
  },
  plugins: [],
};