/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.playstation.com' },
      { protocol: 'https', hostname: '**.sonyentertainmentnetwork.com' },
    ],
  },
};
export default nextConfig;