/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignora a verificação do ESLint durante o build de produção
    ignoreDuringBuilds: true, 
  },
};

module.exports = nextConfig;