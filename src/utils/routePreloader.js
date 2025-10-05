import { useState } from 'react'

// Cache for preloaded components
const componentCache = new Map()

// Preload function that returns a promise
export const preloadRoute = (routeName) => {
  if (componentCache.has(routeName)) {
    return componentCache.get(routeName)
  }

  let promise
  switch (routeName) {
    case 'projects':
      promise = import('../pages/Projects')
      break
    case 'contact':
      promise = import('../pages/Contact')
      break
    case 'home':
      promise = import('../pages/Home')
      break
    default:
      return Promise.resolve()
  }

  componentCache.set(routeName, promise)
  return promise
}

// Hook to preload routes on hover/focus
export const useRoutePreloader = () => {
  const [preloadedRoutes, setPreloadedRoutes] = useState(new Set())

  const preloadOnHover = (routeName) => {
    return {
      onMouseEnter: () => {
        if (!preloadedRoutes.has(routeName)) {
          preloadRoute(routeName).then(() => {
            setPreloadedRoutes((prev) => new Set(prev).add(routeName))
          })
        }
      },
      onFocus: () => {
        if (!preloadedRoutes.has(routeName)) {
          preloadRoute(routeName).then(() => {
            setPreloadedRoutes((prev) => new Set(prev).add(routeName))
          })
        }
      }
    }
  }

  return { preloadOnHover, preloadedRoutes }
}

// Preload all routes when the app starts (after initial load)
export const preloadAllRoutes = () => {
  // Use requestIdleCallback for better performance
  const preload = () => {
    preloadRoute('projects')
    preloadRoute('contact')
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(preload, { timeout: 2000 })
  } else {
    setTimeout(preload, 1000)
  }
}
