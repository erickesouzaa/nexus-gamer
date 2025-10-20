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
        'nexus-dark': '#ff0404ff',      // Preto Fosco (Fundo Principal)
        'nexus-primary': '#00ff00',   // Verde Neon (O Glow)
        'nexus-secondary': '#d9d9d9', // Cinza Prata/Metálico (Para texto e bordas)
        'nexus-accent': '#666666',    // Cinza Escuro (Bordas de Cartões) 
      },
    },
  },
  plugins: [],
};
export default config;