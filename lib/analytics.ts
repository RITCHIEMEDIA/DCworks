// Analytics and tracking service
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== "undefined" && GA_TRACKING_ID) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag("js", new Date())
    window.gtag("config", GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }
}

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_title: title,
      page_location: url,
    })
  }
}

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track donations
export const trackDonation = (amount: number, fund: string, method: string) => {
  trackEvent("donation", "giving", `${fund}-${method}`, amount)

  // Enhanced ecommerce tracking
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: `donation_${Date.now()}`,
      value: amount,
      currency: "NGN",
      items: [
        {
          item_id: fund.toLowerCase().replace(/\s+/g, "_"),
          item_name: `Donation to ${fund}`,
          category: "donation",
          quantity: 1,
          price: amount,
        },
      ],
    })
  }
}

// Track event registrations
export const trackEventRegistration = (eventName: string, eventDate: string) => {
  trackEvent("register", "events", eventName)
}

// Track sermon plays
export const trackSermonPlay = (sermonTitle: string, speaker: string) => {
  trackEvent("play", "sermons", `${sermonTitle} - ${speaker}`)
}

// Track member engagement
export const trackMemberEngagement = (action: string, section: string) => {
  trackEvent(action, "member_portal", section)
}
