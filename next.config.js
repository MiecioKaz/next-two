/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/polpets.appspot.com/o/**",
      },
    ],
  },
};

module.exports = nextConfig;

// "https://firebasestorage.googleapis.com/v0/b/polpets.appspot.com/o/relocate%2Fdog%2FqIv9JBm75ZOrQ4psu2am1CP5OQi2%2Fdoggy4.jpg?alt=media&token=a0004091-911e-4eb1-8698-051796cb9f76"
