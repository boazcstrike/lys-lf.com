import type { NextConfig } from "next";

// Validate required environment variables at build time
if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    console.warn(
        '⚠️ WARNING: REACT_APP_GOOGLE_MAPS_API_KEY is not set. ' +
        'Maps will not load properly. ' +
        'Please set this environment variable before building for production.'
    );
}

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
    env: {
        REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    },
};

export default nextConfig;
