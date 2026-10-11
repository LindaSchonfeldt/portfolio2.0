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

/**
 * The `sizes` attribute for a project card image, so the browser picks the
 * srcset variant that matches the card's rendered width
 * @param {string} size - The card size ('small', 'medium', 'large', 'x-large')
 * @returns {string} - The sizes attribute value
 */
export const getCardImageSizes = (size) =>
  size === 'large' || size === 'x-large'
    ? '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px'
    : size === 'small'
      ? '(max-width: 640px) 100vw, (max-width: 1024px) 400px, 400px'
      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px'
