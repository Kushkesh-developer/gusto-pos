/** @type {import('next').NextConfig} */
// import withBundleAnalyzer from "@next/bundle-analyzer"
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
//   });

const nextConfig = {
    images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'img.freepik.com',
              port: '',
              pathname: '**',
            
            },
          ],
        },
      webpack: (config, { webpack }) => {
         
        config.module.rules.push({
          test: /\.svg$/,
          exclude: /node_modules/,
          use: {
            loader: "svg-react-loader",
          },
          
        });
    
        return config;
      },
      experimental: {
        forceSwcTransforms: true,
      },
  // images: {
  //   domains: [
  //     "via.placeholder.com",
  //     "dummyimage.com"
  //   ],
  // },
};

export default nextConfig;
