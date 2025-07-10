// Performance monitoring and optimization utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Track page load performance
  trackPageLoad(pageName: string) {
    if (typeof window !== "undefined" && "performance" in window) {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

      const metrics = {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        ttfb: navigation.responseStart - navigation.requestStart,
        download: navigation.responseEnd - navigation.responseStart,
        domReady: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        loadComplete: navigation.loadEventEnd - navigation.navigationStart,
      }

      // Log performance metrics
      console.log(`Performance metrics for ${pageName}:`, metrics)

      // Send to analytics (in production, send to your analytics service)
      this.sendMetrics(pageName, metrics)
    }
  }

  // Track Core Web Vitals
  trackCoreWebVitals() {
    if (typeof window !== "undefined") {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log("LCP:", lastEntry.startTime)
        this.metrics.set("lcp", lastEntry.startTime)
      }).observe({ entryTypes: ["largest-contentful-paint"] })

      // First Input Delay (FID)
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          console.log("FID:", entry.processingStart - entry.startTime)
          this.metrics.set("fid", entry.processingStart - entry.startTime)
        })
      }).observe({ entryTypes: ["first-input"] })

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        console.log("CLS:", clsValue)
        this.metrics.set("cls", clsValue)
      }).observe({ entryTypes: ["layout-shift"] })
    }
  }

  // Track API response times
  trackAPICall(endpoint: string, startTime: number, endTime: number) {
    const duration = endTime - startTime
    console.log(`API call to ${endpoint} took ${duration}ms`)
    this.metrics.set(`api_${endpoint}`, duration)
  }

  // Send metrics to analytics service
  private sendMetrics(pageName: string, metrics: any) {
    // In production, send to your analytics service
    if (typeof window !== "undefined" && window.gtag) {
      Object.entries(metrics).forEach(([key, value]) => {
        window.gtag("event", "timing_complete", {
          name: key,
          value: Math.round(value as number),
          event_category: "Performance",
          event_label: pageName,
        })
      })
    }
  }

  // Get current metrics
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics)
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance()
