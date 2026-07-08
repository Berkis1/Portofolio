const fs = require('fs');
const path = require('path');

const root = process.cwd();
const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));
const missing = [];

function extractRefs(html) {
  const refs = [];
  const attrRegex = /(href|src)\s*=\s*"([^"]+)"/g;
  let m;
  while ((m = attrRegex.exec(html)) !== null) {
    refs.push(m[2]);
  }
  // picture/source srcset simple parse
  const srcsetRegex = /srcset\s*=\s*"([^"]+)"/g;
  while ((m = srcsetRegex.exec(html)) !== null) {
    const parts = m[1].split(',').map(s=>s.trim().split(' ')[0]);
    refs.push(...parts);
  }
  return refs;
}

files.forEach(file => {
  const p = path.join(root, file);
  const html = fs.readFileSync(p, 'utf8');
  const refs = extractRefs(html);
  refs.forEach(r => {
    if (!r) return;
    if (r.startsWith('http') || r.startsWith('mailto:') || r.startsWith('#') || r.startsWith('tel:')) return;
    const normalized = r.split('?')[0].split('#')[0];
    const target = path.join(root, normalized);
    if (!fs.existsSync(target)) missing.push({file, ref: r, target});
  });
});

if (missing.length === 0) {
  console.log('OK: No missing local references found in HTML files.');
  process.exit(0);
} else {
  console.log('Missing references found:');
  missing.forEach(m => console.log(`${m.file} → ${m.ref}  (expected: ${m.target})`));
  process.exit(2);
}
