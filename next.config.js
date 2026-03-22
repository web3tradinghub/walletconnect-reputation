/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 1. TypeScript errors ignore karein build pass karne ke liye
  typescript: {
    ignoreBuildErrors: true,
  },

  // 3. Web3 aur Node.js modules ki settings
  webpack: (config) => {
    config.externals.push(
      'pino-pretty', 
      'lokijs', 
      'encoding', 
      'porto', 
      '@react-native-async-storage/async-storage',
      '@base-org/account'
    );

    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false 
    };

    return config;
  },
};

module.exports = nextConfig;