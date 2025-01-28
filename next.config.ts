/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allow build to complete even with ESLint warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow build to complete with TypeScript errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;