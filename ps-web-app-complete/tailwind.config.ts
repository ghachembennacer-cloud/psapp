import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ps-blue': '#00439c',
        'ps-dark': '#0a0a0a',
        'ps-card': '#1a1a1a',
      },
    },
  },
  plugins: [],
}
export default config