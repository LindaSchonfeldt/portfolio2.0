import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

// Only run in production
const isProduction = import.meta.env.PROD
const shouldLogVitals =
  import.meta.env.DEV && import.meta.env.VITE_DEBUG_WEB_VITALS === 'true'

const sendToAnalytics = ({ name, value, id }) => {
  if (!isProduction && shouldLogVitals) {
    console.log(`Web Vital: ${name}`, { value, id })
    return
  }

  // In production, you could send to Google Analytics, etc.
  // Example for Google Analytics 4:
  // gtag('event', name, {
  //   event_category: 'Web Vitals',
  //   value: Math.round(name === 'CLS' ? value * 1000 : value),
  //   event_label: id,
  //   non_interaction: true,
  // })
}

export const initWebVitals = () => {
  if (!isProduction && shouldLogVitals) {
    console.log('Web Vitals monitoring enabled for development')
  }

  // Core Web Vitals
  onCLS(sendToAnalytics)
  onINP(sendToAnalytics) // Replaced FID with INP
  onLCP(sendToAnalytics)

  // Other useful metrics
  onFCP(sendToAnalytics)
  onTTFB(sendToAnalytics)
} // Performance budgets (thresholds for good performance)
export const PERFORMANCE_BUDGETS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100, // First Input Delay (ms)
  CLS: 0.1, // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 800 // Time to First Byte (ms)
}

// Helper to check if metrics meet performance budgets
export const checkPerformanceBudget = (metric, value) => {
  const budget = PERFORMANCE_BUDGETS[metric]
  return budget ? value <= budget : true
}
