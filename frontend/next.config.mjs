/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.dicebear.com","fakestoreapi.com", "cdn.pixabay.com", "example.com", "optimamayoreo.com.mx", "http2.mlstatic.com", "21030021tedw.s3.amazonaws.com"],
  },
  env: {
    API_ROUTE:"http://localhost:3008/api/v1",
    siteTitle: "Tienda Equipo",
    siteDescription: "Your company description.",
    siteKeywords: "your company keywords",
    siteUrl: "https://doggystickers.xyz",
    siteImagePreviewUrl: "/images/main.jpg",
    twitterHandle: "@your_handle",

  },
};

export default nextConfig;

