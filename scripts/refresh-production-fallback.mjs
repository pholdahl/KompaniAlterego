// Optional maintenance helper, not a build step or server dependency.
// Run from any directory: node scripts/refresh-production-fallback.mjs
// Reuses the SAME content and template; never maintain a second copy by hand.
import { readFile, writeFile } from 'node:fs/promises';
import { productions, defaultProduction } from './data.js';
import { productionPage } from './pages/production.js';

const markup = productionPage(productions[defaultProduction]);
for (const path of ['../index.html', '../galaxy-empire/index.html']) {
  const file = new URL(path, import.meta.url);
  const shell = await readFile(file, 'utf8');
  const next = shell.replace(/(<main id="main" tabindex="-1">)[\s\S]*?(<\/main>)/,
    (_, open, close) => `${open}\n${markup}\n${close}`);
  await writeFile(file, next);
}
