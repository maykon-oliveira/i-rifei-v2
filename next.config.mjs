/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["vigilant-space-couscous-6vpx4jv5vg9h494p.github.dev", "localhost:3000"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "scontent-iad3-2.cdninstagram.com"
      },
    ],
  },
}

export default nextConfig
