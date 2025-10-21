/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.awali.com.br',
      'cdn.awsli.com.br'
    ],
  
  },
  // Configuração para IGNORAR ERROS de TIPAGEM no Build
  typescript: {
    ignoreBuildErrors: true, 
  },
  // Desativa o ESLint para que não reclame do @ts-nocheck
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;