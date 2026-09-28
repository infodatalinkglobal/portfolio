import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Sanity Studio package ships ESM that needs transpiling inside Next.
  transpilePackages: ["sanity"],
  // Next 16 builds with Turbopack by default; the `webpack` hook below is
  // kept as a fallback (use `next build --webpack`) to make sure the studio
  // and the app share one React copy.
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias.react = path.resolve(process.cwd(), "node_modules/react");
    config.resolve.alias.reactdom = path.resolve(process.cwd(), "node_modules/react-dom");
    return config;
  },
};

export default nextConfig;
