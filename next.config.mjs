/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "utfs.io" }, // for default fallback image
      { hostname: "lh3.googleusercontent.com" }, // for google profile images
    ],
  },
};

export default nextConfig;
