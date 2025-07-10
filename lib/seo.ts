// SEO utilities and structured data for better search engine optimization
export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "event" | "organization"
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

export function generateMetadata(seo: SEOData) {
  const baseUrl = "https://dominioncityworks.org"
  const defaultImage = `${baseUrl}/images/og-default.jpg`

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(", "),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.url || baseUrl,
      siteName: "Dominion City Works Layout - Greatness Centre",
      images: [
        {
          url: seo.image || defaultImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
      locale: "en_NG",
      type: seo.type || "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.image || defaultImage],
      creator: "@dominioncityworks",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
    },
  }
}

// Generate structured data for better SEO
export function generateChurchStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    name: "Dominion City Works Layout - Greatness Centre",
    alternateName: "Dominion City Works",
    description:
      "A place where lives are transformed, communities are built, and greatness is cultivated through faith, love, and service.",
    url: "https://dominioncityworks.org",
    logo: "https://dominioncityworks.org/images/logo.png",
    image: "https://dominioncityworks.org/images/church-building.jpg",
    telephone: "+234-803-123-4567",
    email: "info@dominioncityworks.org",
    address: {
      "@type": "PostalAddress",
      streetAddress: "97 Works Layout",
      addressLocality: "Owerri Municipal",
      addressRegion: "Imo State",
      postalCode: "460001",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 5.484,
      longitude: 7.0351,
    },
    openingHours: ["Su 08:00-12:30", "Su 18:00-19:30", "We 19:00-20:30", "Fr 19:00-21:00"],
    founder: {
      "@type": "Person",
      name: "Pastor John Adebayo",
    },
    sameAs: [
      "https://facebook.com/dominioncityworks",
      "https://instagram.com/dominioncityworks",
      "https://twitter.com/dominioncityworks",
      "https://youtube.com/dominioncityworks",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Church Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sunday Worship Service",
            description: "Weekly worship service with contemporary music and biblical teaching",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Prayer Meeting",
            description: "Mid-week prayer and Bible study",
          },
        },
      ],
    },
  }
}

// Generate event structured data
export function generateEventStructuredData(event: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date,
    endDate: event.endDate || event.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Dominion City Works Layout",
      address: {
        "@type": "PostalAddress",
        streetAddress: "97 Works Layout",
        addressLocality: "Owerri Municipal",
        addressRegion: "Imo State",
        addressCountry: "NG",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Dominion City Works Layout",
      url: "https://dominioncityworks.org",
    },
    offers: {
      "@type": "Offer",
      url: `https://dominioncityworks.org/events/${event.id}`,
      price: "0",
      priceCurrency: "NGN",
      availability: "https://schema.org/InStock",
    },
  }
}

// Generate article structured data for blog posts
export function generateArticleStructuredData(article: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Dominion City Works Layout",
      logo: {
        "@type": "ImageObject",
        url: "https://dominioncityworks.org/images/logo.png",
      },
    },
    datePublished: article.date,
    dateModified: article.modifiedDate || article.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://dominioncityworks.org/blog/${article.id}`,
    },
  }
}
