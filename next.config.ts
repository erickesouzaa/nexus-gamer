// next.config.js (VERIFICADO CONTRA ERROS DE SINTAXE)
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.awsli.com.br', 
      'm.media-amazon.com',
      'image.api.playstation.com', 
    ],
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;