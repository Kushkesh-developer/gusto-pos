/** @type {import('next').NextConfig} */
// import withBundleAnalyzer from "@next/bundle-analyzer"
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
//   });

const nextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "dummyimage.com"
    ],
  },
};

export default nextConfig;
