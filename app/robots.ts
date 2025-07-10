import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/member-dashboard/private/", "/_next/", "/static/"],
    },
    sitemap: "https://dominioncityworks.org/sitemap.xml",
  }
}
