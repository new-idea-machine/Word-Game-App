import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'background':'#e0f0ff',
        'letter': {
          'border':'#5d677b',
          'correct':'#118f40'
        },
        'keyboard': {
          'key':'#93c5ee',
          'hover':'#a3d5fe',
          'press':'#83b5de',
          'letter':'#082d59'
        }
      }
    },
  },
  plugins: [],
}
export default config
