// client/tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}', // ✅ critical: include components
  ],
  safelist: [
    'font-heading',
    'bg-jify-primary-500',
    'text-jify-primary-500',
    'text-yellow-400',
    'text-green-500',
  ],
  theme: {
    extend: {
      colors: {
        'jify-primary': {
          50: '#fef1f9',
          100: '#fee5f5',
          200: '#ffccee',
          300: '#ffa2df',
          400: '#ff68c8',
          500: '#f502a0', // Your vibrant pink color
          600: '#e00085',
          700: '#c3006f',
          800: '#a2005c',
          900: '#87094e',
          950: '#53002d',
        },
        // Optional: Add some complementary colors
        'jify-secondary': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        heading: ['"Poppins"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;