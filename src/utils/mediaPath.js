/**
 * Generate media path for images and videos
 * Uses public folder for optimized images (available at build time)
 * @param {string} filename - The filename with extension (e.g., 'weatherapp.png')
 * @param {string} type - 'images' or 'videos' (default: 'images')
 * @returns {string} - The resolved asset URL
 */
export const getMediaPath = (filename, type = 'images') => {
  if (type === 'videos') {
    return `/videos/${filename}`
  }

  // Images are in public/images folder
  return `/images/${filename}`
}
