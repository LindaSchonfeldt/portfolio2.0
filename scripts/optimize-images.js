// optimize-images.js
import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp'

// Directory containing your images
const sourceDir = './src/assets'
const outputDir = './src/assets/optimized'

async function optimizeImages() {
  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true })

    // Get all files in source directory
    const files = await fs.readdir(sourceDir)

    // Filter for image files
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext)
    })

    console.log(`Found ${imageFiles.length} images to optimize`)

    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(sourceDir, file)
      const fileBase = path.basename(file, path.extname(file))

      // Create WebP version
      const webpPath = path.join(outputDir, `${fileBase}.webp`)
      await sharp(inputPath)
        .resize(1200) // Max width of 1200px (maintain aspect ratio)
        .webp({ quality: 80 })
        .toFile(webpPath)

      // Create optimized original format version
      const optimizedPath = path.join(outputDir, file)
      await sharp(inputPath).resize(1200).toFile(optimizedPath)

      console.log(`Optimized: ${file} → WebP and optimized original`)
    }

    console.log('Image optimization complete!')
  } catch (err) {
    console.error('Error optimizing images:', err)
  }
}

optimizeImages()
