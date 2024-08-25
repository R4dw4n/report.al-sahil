/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  images: {
    // unoptimized: true,
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
