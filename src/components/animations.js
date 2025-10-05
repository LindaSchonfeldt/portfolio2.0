// Centralized animation variants to reduce bundle size and improve performance

// Common fade animations
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const slideInFromRight = {
  initial: { opacity: 0, x: '100%' },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: '100%' }
}

export const slideInFromLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

// Staggered children animation
export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Scale animations
export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
}

// Animation variants for underline effect
export const underlineAnimation = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 0.6, ease: 'easeInOut' }
}

// Reduced motion support
export const reduceMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 }
}

// Common transition presets
export const transitions = {
  smooth: { duration: 0.3, ease: 'easeInOut' },
  quick: { duration: 0.15, ease: 'easeOut' },
  slow: { duration: 0.6, ease: 'easeInOut' },
  spring: { type: 'spring', stiffness: 300, damping: 30 }
}
