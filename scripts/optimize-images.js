const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = './public/img';
const OUTPUT_DIR = './public/img-optimized';
const QUALITY = 85;
const SIZES = [320, 640, 1024, 1920];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath).toLowerCase();
  
  // Skip if not an image
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return;
  }

  console.log(`Optimizing: ${filename}${ext}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Generate multiple sizes and formats
    for (const size of SIZES) {
      // Skip if original is smaller than target size
      if (metadata.width < size) continue;

      // WebP format
      await image
        .resize(size, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: QUALITY })
        .toFile(path.join(outputDir, `${filename}-${size}w.webp`));

      // Original format (fallback)
      await image
        .resize(size, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: QUALITY })
        .toFile(path.join(outputDir, `${filename}-${size}w.jpg`));
    }

    // Generate placeholder (blurred, low-quality version)
    await image
      .resize(20, null, { withoutEnlargement: true })
      .blur(2)
      .jpeg({ quality: 20 })
      .toFile(path.join(outputDir, `${filename}-placeholder.jpg`));

    console.log(`✅ Optimized: ${filename}${ext}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}${ext}:`, error.message);
  }
}

async function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const subOutputDir = path.join(OUTPUT_DIR, item);
      if (!fs.existsSync(subOutputDir)) {
        fs.mkdirSync(subOutputDir, { recursive: true });
      }
      await processDirectory(fullPath);
    } else {
      await optimizeImage(fullPath, path.dirname(fullPath.replace(INPUT_DIR, OUTPUT_DIR)));
    }
  }
}

async function main() {
  console.log('🚀 Starting image optimization...');
  console.log(`Input: ${INPUT_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Sizes: ${SIZES.join(', ')}px`);
  console.log(`Quality: ${QUALITY}%\n`);

  const startTime = Date.now();
  
  await processDirectory(INPUT_DIR);
  
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  
  console.log(`\n✨ Optimization complete in ${duration.toFixed(2)}s`);
  console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
