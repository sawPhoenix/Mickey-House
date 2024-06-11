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
};
