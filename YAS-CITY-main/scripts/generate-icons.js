/**
 * Generate PWA icons (192 + 512) from logo or brand SVG.
 * Run: npm run generate-icons
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'assets', 'icons');
const LOGO = path.join(__dirname, '..', 'assets', 'images', 'logo.jpeg');

const BRAND_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#0d1117"/>
  <rect x="32" y="32" width="448" height="448" rx="72" fill="#0bb885" opacity="0.15"/>
  <text x="256" y="220" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="72" fill="#0bb885">YAS</text>
  <text x="256" y="300" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="48" fill="#d4af37">CITY</text>
  <circle cx="256" cy="380" r="8" fill="#0bb885"/>
</svg>`;

async function main() {
    let sharp;
    try {
        sharp = require('sharp');
    } catch (e) {
        console.error('Install sharp first: npm install');
        process.exit(1);
    }

    fs.mkdirSync(OUT_DIR, { recursive: true });

    const sizes = [192, 512];
    let input = fs.existsSync(LOGO) ? LOGO : null;

    for (const size of sizes) {
        const out = path.join(OUT_DIR, `icon-${size}.png`);
        if (input) {
            await sharp(input)
                .resize(size, size, { fit: 'cover', position: 'centre' })
                .png()
                .toFile(out);
        } else {
            await sharp(Buffer.from(BRAND_SVG))
                .resize(size, size)
                .png()
                .toFile(out);
        }
        console.log('Created', out);
    }

    const svgOut = path.join(OUT_DIR, 'icon.svg');
    fs.writeFileSync(svgOut, BRAND_SVG);
    console.log('Created', svgOut);
}

main().catch(console.error);
