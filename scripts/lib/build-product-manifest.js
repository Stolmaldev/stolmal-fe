/**
 * Scans `public/assets/products/<category>` directories (backed by the
 * `storage` folder mounted alongside this project) and produces a manifest
 * describing every image found per product category.
 *
 * This is the single source of truth the frontend gallery reads from — no
 * image needs to be listed by hand. Add or remove a file in `storage/<dir>`
 * and it is picked up the next time the manifest is (re)generated.
 */
const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.join(
  __dirname,
  '..',
  '..',
  'public',
  'assets',
  'products'
);

// Order matches how categories should be displayed in the gallery.
const CATEGORIES = ['beds', 'chairs', 'tables', 'furniture-care-product'];

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function listCategoryImages(category) {
  const dir = path.join(PRODUCTS_DIR, category);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())
    )
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => ({
      src: `/assets/products/${category}/${encodeURIComponent(name)}`,
      name,
    }));
}

function buildManifest() {
  const manifest = {};
  for (const category of CATEGORIES) {
    manifest[category] = listCategoryImages(category);
  }
  return manifest;
}

function writeManifest() {
  const manifest = buildManifest();
  const manifestPath = path.join(
    PRODUCTS_DIR,
    '..',
    'product-manifest.json'
  );
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  return manifest;
}

module.exports = { CATEGORIES, PRODUCTS_DIR, buildManifest, writeManifest };
