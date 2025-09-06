
import { createMDX } from 'fumadocs-mdx/next';
import withPWA from 'next-pwa';
import pwaConfig from './next-pwa.config.mjs';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",
};

export default withPWA(pwaConfig)(withMDX(config));
