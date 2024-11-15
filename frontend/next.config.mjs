/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com", "cdn.pixabay.com"],
  },
  env: {
    siteTitle: "Tienda Equipo C",
    siteDescription: "Your company description.",
    siteKeywords: "your company keywords",
    siteUrl: "https://doggystickers.xyz",
    siteImagePreviewUrl: "/images/main.jpg",
    twitterHandle: "@your_handle",
  },
};

export default nextConfig;
