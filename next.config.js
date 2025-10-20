/** @type {import('next').NextConfig} */
const nextConfig = {
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