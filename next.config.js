/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    // During deployment we'll run type checking separately
    ignoreBuildErrors: true,
  },
  eslint: {
    // During deployment we'll run linting separately
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
