#!/usr/bin/env node
/**
 * Merges single-protocol brand pages in STPIHKAL.
 * For brands with only one protocol.md file alongside index.md,
 * replaces index.md with protocol.md content and deletes protocol.md.
 */

const fs = require('fs');
const path = require('path');

const PROTOCOLS_DIR = path.join(__dirname, '..', 'stpihkal', 'protocols');
const SKIP_DIRS = new Set(['erostek', 'kiiroo', 'libo', 'magic-motion', 'monsterpub']);

const entries = fs.readdirSync(PROTOCOLS_DIR, { withFileTypes: true });
const brands = entries.filter(e => e.isDirectory() && !e.name.startsWith('_'));

let merged = 0;
let skippedMulti = [];
let skippedOther = [];

for (const brand of brands) {
  if (SKIP_DIRS.has(brand.name)) {
    skippedOther.push(brand.name + ' (explicitly skipped)');
    continue;
  }

  const brandDir = path.join(PROTOCOLS_DIR, brand.name);
  const files = fs.readdirSync(brandDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  // Expect exactly index.md + one protocol file
  if (mdFiles.length !== 2 || !mdFiles.includes('index.md')) {
    skippedMulti.push(`${brand.name} (${mdFiles.length} md files: ${mdFiles.join(', ')})`);
    continue;
  }

  const protocolFile = mdFiles.find(f => f !== 'index.md');
  const protocolPath = path.join(brandDir, protocolFile);
  const indexPath = path.join(brandDir, 'index.md');

  // Read protocol.md content and write as index.md
  const content = fs.readFileSync(protocolPath, 'utf8');
  fs.writeFileSync(indexPath, content);
  fs.unlinkSync(protocolPath);

  console.log(`✓ ${brand.name}: ${protocolFile} → index.md`);
  merged++;
}

console.log(`\n--- Summary ---`);
console.log(`Merged: ${merged}`);
console.log(`Skipped (explicit): ${skippedOther.join(', ')}`);
if (skippedMulti.length) {
  console.log(`Skipped (unexpected): ${skippedMulti.join(', ')}`);
}
