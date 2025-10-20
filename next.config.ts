/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para permitir o acesso via IP da rede (192.168.1.13)
  // Adicionar a porta 3000 também é importante
  allowedDevOrigins: [
    'http://192.168.1.13:3000',
    'http://192.168.1.13',
    '192.168.1.13:3000',
  ],
};

module.exports = nextConfig;