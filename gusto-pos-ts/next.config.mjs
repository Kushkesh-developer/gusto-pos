/** @type {import('next').NextConfig} */
// import withBundleAnalyzer from "@next/bundle-analyzer"
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
//   });

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Set this to false to ignore type errors during the build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
