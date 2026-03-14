/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["mapbox-gl", "react-map-gl"],

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;