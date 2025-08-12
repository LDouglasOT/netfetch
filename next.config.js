/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com', 'i.vimeocdn.com'],
  },
}

module.exports = nextConfig