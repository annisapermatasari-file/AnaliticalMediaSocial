import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#0f172a',
        'navy-light': '#1e293b',
        'navy-lighter': '#334155',
        'primary-blue': '#1e40af',
        'primary-blue-light': '#3b82f6',
        'light-gray': '#f1f5f9',
        'light-gray-darker': '#e2e8f0',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;
