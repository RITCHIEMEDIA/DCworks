import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobileNavigation } from "@/components/mobile-navigation"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dominion City Works Layout - Greatness Centre",
  description:
    "A place where lives are transformed, communities are built, and greatness is cultivated through faith, love, and service.",
  keywords: "Dominion City, Greatness Centre, church, worship, community, faith, Owerri, Nigeria",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#3B82F6",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dominion City",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: "Dominion City Works Layout - Greatness Centre",
    address: {
      "@type": "PostalAddress",
      streetAddress: "97 Works Layout",
      addressLocality: "Owerri Municipal",
      addressRegion: "Imo State",
      addressCountry: "Nigeria",
    },
    telephone: "+234-803-123-4567",
    email: "info@dominioncity.org",
    url: "https://dominioncity.org",
    geo: {
      "@type": "GeoCoordinates",
      latitude: "5.4840",
      longitude: "7.0351",
    },
  }

  return (
    <html lang="en">
      <head>
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileNavigation />
        <PWAInstallPrompt />
      </body>
    </html>
  )
}
