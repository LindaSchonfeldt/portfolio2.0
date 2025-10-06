import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const inputDir = path.join(__dirname, '../src/assets')
const outputDir = path.join(__dirname, '../src/assets/optimized')

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

      // Generate WebP version with aggressive compression
      const webpPath = path.join(outputDir, `${name}${size.suffix}.webp`)
      await image
        .clone()
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 70, effort: 6 }) // Reduced from 75, increased effort
        .toFile(webpPath)

      console.log(`✓ Created WebP: ${name}${size.suffix}.webp`)

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
          .jpeg({ quality: 75, progressive: true })
          .toFile(outputPath)
      } else {
        await outputImage
          .png({ compressionLevel: 9, quality: 75 })
          .toFile(outputPath)
      }

      console.log(`✓ Created fallback: ${name}${size.suffix}${ext}`)
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
