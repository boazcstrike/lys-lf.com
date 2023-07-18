/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID:
      process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID,
    REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    PUBLIC_URL: "public/",
  },
  output: "export",
}

module.exports = nextConfig
