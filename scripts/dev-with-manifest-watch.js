#!/usr/bin/env node
/**
 * Dev entry point: generates the product manifest once, keeps watching the
 * `storage`-backed category folders for added/removed images and
 * regenerates it on the fly, then boots the regular CRA dev server.
 *
 * This is what makes the gallery "just work" when someone drops a new photo
 * into `storage/<category>` — no rebuild or manual list update required.
 */
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { CATEGORIES, PRODUCTS_DIR, writeManifest } = require('./lib/build-product-manifest');

function regenerate(reason) {
  try {
    const manifest = writeManifest();
    const summary = Object.entries(manifest)
      .map(([category, images]) => `${category}: ${images.length}`)
      .join(', ');
    console.log(`[product-manifest] ${reason} -> regenerated (${summary})`);
  } catch (err) {
    console.error('[product-manifest] failed to regenerate:', err.message);
  }
}

regenerate('startup');

let debounceTimer;
const scheduleRegenerate = (reason) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => regenerate(reason), 300);
};

for (const category of CATEGORIES) {
  const dir = path.join(PRODUCTS_DIR, category);
  if (!fs.existsSync(dir)) {
    console.warn(`[product-manifest] "${category}" folder not found, skipping watch`);
    continue;
  }
  try {
    fs.watch(dir, () => scheduleRegenerate(`change in "${category}"`));
  } catch (err) {
    console.warn(`[product-manifest] could not watch "${category}":`, err.message);
  }
}

const reactScriptsBin = require.resolve('react-scripts/bin/react-scripts.js');
const child = spawn(process.execPath, [reactScriptsBin, 'start'], {
  stdio: 'inherit',
});

child.on('exit', (code) => process.exit(code ?? 0));
