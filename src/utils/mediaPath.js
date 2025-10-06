/**
 * Generate media path for images and videos
 * Uses Vite's new URL() for proper asset resolution during build
 * @param {string} filename - The filename with extension (e.g., 'weatherapp.png')
 * @param {string} type - 'images' or 'videos' (default: 'images')
 * @returns {string} - The resolved asset URL
 */
export const getMediaPath = (filename, type = 'images') => {
  try {
    if (type === 'videos') {
      // For videos, use the videos folder
      return new URL(`../assets/videos/${filename}`, import.meta.url).href
    }
    // For images, use the optimized folder
    return new URL(`../assets/optimized/${filename}`, import.meta.url).href
  } catch (error) {
    console.error(`Error loading media: ${filename}`, error)
    // Return fallback tree SVG
    return new URL('../assets/tree.svg', import.meta.url).href
  }
}
