/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    
    scrollRestoration: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: { 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      }
    ]
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/submit-tool',
        destination: '/submit-tool/form',
        permanent: true,
      },
    ]
  },
  // Remove the rewrites section as it's not necessary for this use case
}

module.exports = nextConfig;