#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const OPTIMIZED_DIR = path.join(__dirname, '../public/images/optimized');
const QUALITY = 80;
const MAX_WIDTH = 1920;

async function optimizeImages() {
  if (!fs.existsSync(OPTIMIZED_DIR)) {
    fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
  }

  const files = fs.readdirSync(IMAGES_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext) && !fs.statSync(path.join(IMAGES_DIR, file)).isDirectory();
  });

  console.log(`\n🖼️  Optimizing ${files.length} images...\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of files) {
    const inputPath = path.join(IMAGES_DIR, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(OPTIMIZED_DIR, `${baseName}.webp`);

    const originalSize = fs.statSync(inputPath).size;
    totalOriginal += originalSize;

    try {
      await sharp(inputPath)
        .resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      const optimizedSize = fs.statSync(outputPath).size;
      totalOptimized += optimizedSize;

      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      console.log(`✅ ${file} → ${baseName}.webp (${formatBytes(originalSize)} → ${formatBytes(optimizedSize)}, -${savings}%)`);
    } catch (err) {
      console.error(`❌ Failed to optimize ${file}: ${err.message}`);
    }
  }

  console.log('\n' + '─'.repeat(60));
  console.log(`📊 Total: ${formatBytes(totalOriginal)} → ${formatBytes(totalOptimized)}`);
  console.log(`💾 Saved: ${formatBytes(totalOriginal - totalOptimized)} (${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%)`);
  console.log('─'.repeat(60));
  console.log(`\n✨ Optimized images saved to: public/images/optimized/\n`);
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

optimizeImages().catch(console.error);
