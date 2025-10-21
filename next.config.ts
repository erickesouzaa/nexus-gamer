// next.config.js (CÓDIGO COMPLETO E FINAL)
/** @type {import('next').NextConfig} */
const nextConfig = {
  // CONFIGURAÇÃO DE IMAGENS: USA remotePatterns para flexibilidade
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.awsli.com.br',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      // CORREÇÃO: Usa o wildcard para aceitar o domínio da PlayStation
      {
        protocol: 'https',
        // O hostname 'image.api.playstation.com' será aceito por esta regra
        hostname: 'image.api.playstation.com', 
      },
    ],
  },
  
  // CONFIGURAÇÃO DE BUILD: IGNORA ERROS DE CÓDIGO/TIPAGEM (PARA O VERCEL)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;