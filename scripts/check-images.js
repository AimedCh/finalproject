import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if images exist
function checkImageExists(imagePath) {
  const fullPath = path.join(__dirname, '..', 'public', imagePath);
  return fs.existsSync(fullPath);
}

// AirPods images to check
const airpodsImages = [
  '/img/imgAirPods/airpods4.jpeg',
  '/img/imgAirPods/airpods43.jpeg', 
  '/img/imgAirPods/airpodspro3.jpeg',
  '/img/imgAirPods/airpodsmax.png'
];

// Rental images to check
const rentalImages = [
  '/img/imgAlquieres/habitacion1.png',
  '/img/imgAlquieres/habitacion2.png',
  '/img/imgAlquieres/habitacion3.png',
  '/img/imgAlquieres/habitacion4.png',
  '/img/imgAlquieres/mostaganem.jpg',
  '/img/imgAlquieres/mosta4k.mp4'
];

console.log('🔍 Checking image files...\n');

console.log('📱 AirPods Images:');
airpodsImages.forEach(imagePath => {
  const exists = checkImageExists(imagePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${imagePath}`);
});

console.log('\n🏠 Rental Images:');
rentalImages.forEach(imagePath => {
  const exists = checkImageExists(imagePath);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${imagePath}`);
});

// Check if all images exist
const allImages = [...airpodsImages, ...rentalImages];
const missingImages = allImages.filter(imagePath => !checkImageExists(imagePath));

console.log('\n📊 Summary:');
console.log(`Total images: ${allImages.length}`);
console.log(`Found: ${allImages.length - missingImages.length}`);
console.log(`Missing: ${missingImages.length}`);

if (missingImages.length > 0) {
  console.log('\n❌ Missing images:');
  missingImages.forEach(imagePath => {
    console.log(`  - ${imagePath}`);
  });
} else {
  console.log('\n✅ All images found!');
}

// Check file sizes
console.log('\n📏 File sizes:');
allImages.forEach(imagePath => {
  const fullPath = path.join(__dirname, '..', 'public', imagePath);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`${imagePath}: ${sizeKB} KB`);
  }
});
