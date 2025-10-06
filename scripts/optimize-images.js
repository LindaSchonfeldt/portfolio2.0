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

      // Create multiple sizes for responsive loading
      const sizes = [
        { width: 1200, suffix: '' },
        { width: 800, suffix: '-medium' },
        { width: 400, suffix: '-small' }
      ]

      for (const size of sizes) {
        // Create WebP version
        const webpPath = path.join(outputDir, `${fileBase}${size.suffix}.webp`)
        await sharp(inputPath)
          .resize(size.width)
          .webp({ quality: 75 }) // Reduced from default 80
          .toFile(webpPath)

        // Create optimized original format version
        const optimizedPath = path.join(
          outputDir,
          `${fileBase}${size.suffix}${path.extname(file)}`
        )
        await sharp(inputPath)
          .resize(size.width)
          .jpeg({ quality: 80 }) // For JPG
          .png({ compressionLevel: 9 }) // Max compression for PNG
          .toFile(optimizedPath)
      }

      console.log(`Optimized: ${file} → WebP and optimized originals (3 sizes)`)
    }

    console.log('Image optimization complete!')
  } catch (err) {
    console.error('Error optimizing images:', err)
  }
}

optimizeImages()
