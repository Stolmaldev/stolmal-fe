#!/usr/bin/env node
/**
 * One-off manifest generation, used as a `prebuild` step so production
 * builds always ship an up-to-date `manifest.json` alongside the images.
 */
const { writeManifest } = require('./lib/build-product-manifest');

const manifest = writeManifest();
const summary = Object.entries(manifest)
  .map(([category, images]) => `${category}: ${images.length}`)
  .join(', ');

console.log(`[product-manifest] generated (${summary})`);
