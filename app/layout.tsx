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
    generator: 'Ritchietech.vercel.app'
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
      streetAddress: "Cradle Event hall, Works Layout owerri",
      addressLocality: "Owerri Municipal",
      addressRegion: "Imo State",
      addressCountry: "Nigeria",
    },
    telephone: "+234-812-511-9785",
    email: "dominioncityworkslayout@gmail.com",
    url: "https://dcworkslayout.vercel.app",
    geo: {
      "@type": "GeoCoordinates",
      latitude: "5.4966° N",
      longitude: "7.0353° E",
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
        <link rel="icon" type="image/png" sizes="32x32" href="/images/image.jpg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/image.jpg" />
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
