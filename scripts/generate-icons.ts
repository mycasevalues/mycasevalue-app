import { writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Generate PWA icons as SVG PNG files
 * Creates simple blue square icons with "MCV" text
 */

const sizes = [192, 512];
const accentColor = '#18181A';
const textColor = '#FFFFFF';

function generateSVG(size: number): string {
  const fontSize = Math.floor(size * 0.4);
  const textX = size / 2;
  const textY = size / 2 + fontSize / 3;

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${accentColor}"/>
  <text x="${textX}" y="${textY}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="700" text-anchor="middle" fill="${textColor}">MCV</text>
</svg>`;
}

// Note: SVG files are text-based. For PNG conversion, use:
// - ImageMagick: convert -background none icon.svg icon-192.png
// - Sharp: require('sharp')('icon.svg').png().toFile('icon-192.png')
// - Online tools or build pipeline integration

sizes.forEach((size) => {
  const svg = generateSVG(size);
  const publicDir = join(process.cwd(), 'public');
  const filePath = join(publicDir, `icon-${size}.svg`);
  
  writeFileSync(filePath, svg, 'utf-8');
  console.log(`Generated: ${filePath}`);

  // Also generate maskable variant (same content, used for adaptive icons)
  const maskableFilePath = join(publicDir, `icon-${size}-maskable.svg`);
  writeFileSync(maskableFilePath, svg, 'utf-8');
  console.log(`Generated: ${maskableFilePath}`);
});

console.log('\nTo convert SVGs to PNG:');
console.log('  npm install -g imagemagick');
console.log('  convert -background none public/icon-192.svg -define png:bit-depth=8 public/icon-192.png');
console.log('  convert -background none public/icon-512.svg -define png:bit-depth=8 public/icon-512.png');
