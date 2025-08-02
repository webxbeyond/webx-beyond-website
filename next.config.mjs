import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: { remotePatterns: [ { protocol: "https", hostname: "b.anis.cc", }, { protocol: "https", hostname: "avatars.githubusercontent.com", }, ], },
};

export default withMDX(config);
