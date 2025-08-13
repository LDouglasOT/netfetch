/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com', 'i.vimeocdn.com'],
  },
  transpilePackages: ['undici'],  
  webpack: (config, { isServer }) => {
    // Add a rule to transpile 'undici' package
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/undici/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
