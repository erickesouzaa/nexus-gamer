// tailwind.config.ts (O novo arquivo)
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cores Temáticas NEXUS Gamer
        'nexus-blue': '#00BFFF',
        'nexus-primary': '#FF4500',
        'nexus-secondary': '#39FF14', 
      },
    },
  },
  plugins: [],
};
export default config;