import { useState } from 'react'

// Cache for preloaded components
const componentCache = new Map()

// Page imports by route name. Add new pages here to make them preloadable
const routeImports = {
  home: () => import('../pages/Home'),
  about: () => import('../pages/About'),
  projects: () => import('../pages/Projects'),
  caseStudy: () => import('../pages/ProjectCaseStudy'),
  contact: () => import('../pages/Contact')
}

// Main pages reachable from the nav, preloaded in the background
export const mainRoutes = ['home', 'about', 'projects', 'contact']

// Map a URL path to its route name, or null if unknown
export const getRouteName = (pathname) => {
  if (pathname === '/') return 'home'
  if (pathname === '/about') return 'about'
  if (pathname === '/projects') return 'projects'
  if (pathname.startsWith('/projects/')) return 'caseStudy'
  if (pathname === '/contact') return 'contact'
  return null
}

// Preload function that returns a promise
export const preloadRoute = (routeName) => {
  if (componentCache.has(routeName)) {
    return componentCache.get(routeName)
  }

  const load = routeImports[routeName]
  if (!load) return Promise.resolve()

  const promise = load()
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
