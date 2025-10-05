// Utility to generate asset URLs for images and videos
export const getMediaPath = (fileName, folder = 'optimized') => {
  if (!fileName) return null
  try {
    return new URL(`../assets/${folder}/${fileName}`, import.meta.url).href
  } catch {
    return null
  }
}
