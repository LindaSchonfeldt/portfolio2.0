/**
 * Preload images by adding prefetch link tags to the document head
 * @param {string[]} imagePaths - Array of image paths to preload
 */
export const preloadImages = (imagePaths) => {
  imagePaths.forEach((src) => {
    // Check if already preloaded to avoid duplicates
    const existingLink = document.querySelector(`link[href="${src}"]`)
    if (existingLink) return

    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}

/**
 * Preload the first project images (Naima)
 */
export const preloadProjectImages = () => {
  const images = [
    '/images/naima-small.webp',
    '/images/naima-medium.webp',
    '/images/naima.webp'
  ]
  preloadImages(images)
}
