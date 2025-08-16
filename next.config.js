/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com', 'i.vimeocdn.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // For client-side builds, ignore Node.js-specific modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
      
      // Ignore these modules completely for client builds
      config.externals = config.externals || [];
      config.externals.push({
        undici: 'undici',
        '@distube/ytdl-core': '@distube/ytdl-core',
      });
    }

    return config;
  },
};

module.exports = nextConfig;