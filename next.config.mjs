/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.report.al-sahil.net',
        port: ''
      },
    ],
  },
};

export default nextConfig;
