import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://campus-vault-olive.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://campus-vault-olive.vercel.app/dashboard",
      lastModified: new Date(),
    },
  ];
}