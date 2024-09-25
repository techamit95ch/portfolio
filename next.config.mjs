const isGithubActions = process.env.GITHUB_ACTIONS || false;
let assetPrefix = "";
let basePath = "";

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix,
  basePath,
  images: {
    unoptimized: true,
    domains: ["*"], // Allow all domains
    deviceSizes: [320, 420, 768, 1024, 1200], // Adjust as needed
    minimumCacheTTL: 60, // Set the minimum cache time to 60 seconds
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  distDir: "out",
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
};
export default nextConfig;
