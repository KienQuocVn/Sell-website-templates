"use client"

import { useEffect } from "react"

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== "undefined" && "performance" in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "navigation") {
            const navEntry = entry as PerformanceNavigationTiming
            console.log("Navigation timing:", {
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
              loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
              firstByte: navEntry.responseStart - navEntry.requestStart,
            })
          }

          if (entry.entryType === "paint") {
            console.log(`${entry.name}: ${entry.startTime}ms`)
          }

          if (entry.entryType === "largest-contentful-paint") {
            console.log(`LCP: ${entry.startTime}ms`)
          }
        }
      })

      try {
        observer.observe({ entryTypes: ["navigation", "paint", "largest-contentful-paint"] })
      } catch (e) {
        console.log("Performance observer not supported")
      }

      // Cleanup
      return () => observer.disconnect()
    }
  }, [])

  return null
}
