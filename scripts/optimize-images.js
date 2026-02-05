import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const inputDir = path.join(__dirname, '../src/assets')
const outputDir = path.join(__dirname, '../public/images')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const sizes = [
  { width: 400, suffix: '-small' },
  { width: 800, suffix: '-medium' },
  { width: 1200, suffix: '' }
]

const optimizeImage = async (inputPath, filename) => {
  const ext = path.extname(filename).toLowerCase()
  const name = path.basename(filename, ext)

  for (const size of sizes) {
    try {
      const image = sharp(inputPath)

      // Generate WebP version with VERY aggressive compression
      const webpPath = path.join(outputDir, `${name}${size.suffix}.webp`)
      await image
        .clone()
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({
          quality: 60, // Reduced from 70
          effort: 6, // Maximum compression effort
          smartSubsample: true // Better quality at lower file sizes
        })
        .toFile(webpPath)

      // Check file size
      const stats = fs.statSync(webpPath)
      const fileSizeKB = (stats.size / 1024).toFixed(2)
      console.log(
        `✓ Created WebP: ${name}${size.suffix}.webp (${fileSizeKB} KB)`
      )

      // Generate fallback version with better compression
      const outputPath = path.join(
        outputDir,
        `${name}${size.suffix}${ext === '.jpg' ? '.jpg' : '.png'}`
      )

      const outputImage = image.clone().resize(size.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })

      if (ext === '.jpg' || ext === '.jpeg') {
        await outputImage
          .jpeg({
            quality: 70, // Reduced from 75
            progressive: true,
            mozjpeg: true // Use mozjpeg for better compression
          })
          .toFile(outputPath)
      } else {
        await outputImage
          .png({
            compressionLevel: 9,
            quality: 70 // Reduced from 75
          })
          .toFile(outputPath)
      }

      const fallbackStats = fs.statSync(outputPath)
      const fallbackSizeKB = (fallbackStats.size / 1024).toFixed(2)
      console.log(
        `✓ Created fallback: ${name}${size.suffix}${ext} (${fallbackSizeKB} KB)`
      )
    } catch (error) {
      console.error(
        `Error processing ${filename} at size ${size.suffix}:`,
        error
      )
    }
  }
}

// Process all images in the assets directory
const files = fs.readdirSync(inputDir)

for (const file of files) {
  const ext = path.extname(file).toLowerCase()
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const inputPath = path.join(inputDir, file)
    console.log(`\nProcessing: ${file}`)
    await optimizeImage(inputPath, file)
  }
}

console.log('\n✓ Image optimization complete!')
console.log('\nImages saved to: public/images/')
console.log('\nTarget file sizes:')
console.log('  - Small (400px): ~20-40 KB')
console.log('  - Medium (800px): ~60-100 KB')
console.log('  - Large (1200px): ~100-180 KB')
