import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0f2a2a',
        'ink-light': '#5b7674',
        night: {
          900: '#051512',
          800: '#0a1f19',
          700: '#0f2b23',
          600: '#15392f',
          500: '#1c4a3c',
        },
        teal: {
          50: '#effcf6',
          100: '#d6f7e8',
          200: '#a8ecd0',
          300: '#6fdcb4',
          400: '#3fc79a',
          500: '#21ab81',
          600: '#158a68',
          700: '#136f56',
          800: '#135846',
          900: '#12483b',
        },
        mint: '#a8e6cf',
        orange: {
          50: '#fff4ec',
          100: '#ffe4cf',
          200: '#ffc79c',
          300: '#ffa363',
          400: '#ff8636',
          500: '#f9700f',
          600: '#e05605',
          700: '#b84206',
          800: '#93350c',
          900: '#792d0d',
        },
        surface: '#f4f9f7',
        'surface-alt': '#eaf6f1',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(6, 30, 24, 0.05), 0 2px 8px -2px rgba(6, 30, 24, 0.08)',
        'card-lg': '0 8px 24px -8px rgba(6, 30, 24, 0.18), 0 2px 8px -2px rgba(6, 30, 24, 0.08)',
        glow: '0 0 0 1px rgba(63, 199, 154, 0.15), 0 8px 24px -8px rgba(21, 138, 104, 0.35)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at top right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
