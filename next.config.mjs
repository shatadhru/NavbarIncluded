/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // সব host allow করবে
        pathname: "/**", // সব path allow করবে
      },
    ],
  },
};

export default nextConfig;