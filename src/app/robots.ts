const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://sellerkit.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
