/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Add better build configuration for deployment
  swcMinify: true,
  reactStrictMode: false,
  // Force static generation for all pages
  trailingSlash: true,
  // Better error handling during build
}

export default nextConfig
