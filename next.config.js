/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  // reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
  },
});

module.exports = {
  ...nextConfig,
  ...withMDX({
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  }),
  webpack(config, { isServer }) {
    // 支持导入 Markdown 文件
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },
};
