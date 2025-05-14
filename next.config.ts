import type { NextConfig } from "next";
import { DOMAIN_IMAGE_URL_ONE, DOMAIN_IMAGE_URL_THREE, DOMAIN_IMAGE_URL_TWO } from "./constants/api";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
  DOMAIN_IMAGE_URL_ONE,
  DOMAIN_IMAGE_URL_TWO,
  DOMAIN_IMAGE_URL_THREE,],
  },
};

export default nextConfig;
