import { getCardImageSizes } from './mediaPath'

// Matches the cards the Projects page renders with eager loading
const PRELOAD_COUNT = 3

let projectImagesPreloaded = false

/**
 * Preload the images of the first project cards on the Projects page.
 * Each image gets the same srcset and sizes as its card, so the browser
 * downloads exactly the variant the card will use
 */
export const preloadProjectImages = async () => {
  if (projectImagesPreloaded) return
  projectImagesPreloaded = true

  // Loaded on demand so the project data stays out of the startup bundle
  const { default: projectsData } = await import('../data/projects.json')

  projectsData.projects.slice(0, PRELOAD_COUNT).forEach((project) => {
    // Cards without an image show tree.svg, and video cards load their own media
    if (!project.image || project.image === 'tree' || project.video) return

    const base = `/images/${project.image}`
    const img = new Image()
    // sizes must be set before srcset, or the browser may pick a variant too early
    img.sizes = getCardImageSizes(project.size || 'medium')
    img.srcset = `${base}-small.webp 400w, ${base}-medium.webp 800w, ${base}.webp 1200w`
  })
}
