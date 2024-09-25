const isGithubActions = process.env.GITHUB_ACTIONS || false;
let assetPrefix = "";
let basePath = "";

if (isGithubActions) {
  // Use optional chaining to safely access GITHUB_REPOSITORY
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") || "";
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: assetPrefix,
  basePath: basePath,
  images: {
    unoptimized: true,
    deviceSizes: [320, 420, 768, 1024, 1200],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  distDir: "out",
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
