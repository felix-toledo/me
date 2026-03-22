import type { MetadataRoute } from "next";
import me from "@/data/me.json";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${me.siteUrl}/sitemap.xml`,
    host: me.siteUrl,
  };
}
