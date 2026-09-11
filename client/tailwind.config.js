/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        enhancv: {
          teal: '#00c598',
          tealDark: '#00a37e',
          tealLight: '#e6faf5',
          navy: '#1b2a4a',
          sidebar: '#f3f5f8',
          border: '#e2e8f0',
          heading: '#1e293b',
          muted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'enhancv': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'floating': '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'toolbar': '0 4px 14px 0 rgba(0, 0, 0, 0.12)'
      }
    },
  },
  plugins: [],
}
