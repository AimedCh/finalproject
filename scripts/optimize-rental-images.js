const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration for rental images
const INPUT_DIR = './public/img/imgAlquieres';
const OUTPUT_DIR = './public/img/imgAlquieres-optimized';
const QUALITY = 85;
const SIZES = [320, 640, 1024, 1920];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeRentalImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath).toLowerCase();
  
  // Skip if not an image
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return;
  }

  console.log(`Optimizing rental image: ${filename}${ext}`);

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

async function processRentalImages() {
  console.log('🚀 Starting rental images optimization...');
  console.log(`Input: ${INPUT_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Sizes: ${SIZES.join(', ')}px`);
  console.log(`Quality: ${QUALITY}%\n`);

  const startTime = Date.now();
  
  try {
    const items = fs.readdirSync(INPUT_DIR);
    
    for (const item of items) {
      const fullPath = path.join(INPUT_DIR, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isFile()) {
        await optimizeRentalImage(fullPath, OUTPUT_DIR);
      }
    }
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log(`\n✨ Rental images optimization complete in ${duration.toFixed(2)}s`);
    console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
    console.log(`\n📋 Next steps:`);
    console.log(`1. Update image paths in Rentals.tsx to use optimized versions`);
    console.log(`2. Test the page loading speed`);
    console.log(`3. Consider using a CDN for even better performance`);
    
  } catch (error) {
    console.error('Error processing rental images:', error);
  }
}

processRentalImages().catch(console.error);
