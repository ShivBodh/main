/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lightcoral-echidna-355938.hostingersite.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
       {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'media1.giphy.com',
      }
    ],
  },
};

module.exports = nextConfig;
