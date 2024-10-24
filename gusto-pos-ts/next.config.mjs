/** @type {import('next').NextConfig} */
// import withBundleAnalyzer from "@next/bundle-analyzer"
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
//   });

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
