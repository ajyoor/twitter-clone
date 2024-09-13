/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["dummyjson.com"],
  },
};

export default nextConfig;
