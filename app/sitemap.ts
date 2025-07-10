import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dominioncityworks.org"

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/services",
    "/events",
    "/sermons",
    "/ministries",
    "/giving",
    "/contact",
    "/blog",
    "/member-dashboard",
  ]

  // Generate sitemap entries for static pages
  const staticEntries = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1 : 0.8,
  }))

  // Add dynamic blog posts (in production, fetch from database)
  const blogEntries = [
    {
      url: `${baseUrl}/blog/building-strong-communities`,
      lastModified: new Date("2024-03-15"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/youth-ministry-empowering-next-generation`,
      lastModified: new Date("2024-03-12"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]

  // Add dynamic sermon pages
  const sermonEntries = [
    {
      url: `${baseUrl}/sermons/walking-in-your-purpose`,
      lastModified: new Date("2024-03-10"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  return [...staticEntries, ...blogEntries, ...sermonEntries]
}
