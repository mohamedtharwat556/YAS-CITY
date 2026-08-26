/**
 * Convert images in assets/images to WebP (keeps originals).
 * Run: npm run optimize-images
 */
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images');
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];

async function main() {
    let sharp;
    try {
        sharp = require('sharp');
    } catch (e) {
        console.error('Install sharp first: npm install');
        process.exit(1);
    }

    if (!fs.existsSync(IMAGES_DIR)) {
        console.log('No assets/images folder found — skipping.');
        return;
    }

    const files = fs.readdirSync(IMAGES_DIR, { recursive: true });
    let converted = 0;

    for (const file of files) {
        const rel = typeof file === 'string' ? file : file.toString();
        const ext = path.extname(rel).toLowerCase();
        if (!EXTENSIONS.includes(ext)) continue;

        const src = path.join(IMAGES_DIR, rel);
        if (!fs.statSync(src).isFile()) continue;

        const dest = src.replace(/\.(jpe?g|png)$/i, '.webp');

        try {
            await sharp(src)
                .webp({ quality: 82 })
                .toFile(dest);
            converted++;
            console.log('✓', rel, '→', path.basename(dest));
        } catch (err) {
            console.warn('✗', rel, err.message);
        }
    }

    console.log(`\nDone. ${converted} WebP file(s) created.`);
    console.log('Use <picture> in HTML: <source srcset="image.webp" type="image/webp">');
}

main();
