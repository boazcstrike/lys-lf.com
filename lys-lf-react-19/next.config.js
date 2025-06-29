const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
    env: {
        REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    },
};

module.exports = nextConfig;