// Optional maintenance helper, not a build step or server dependency.
// Run from any directory: node scripts/refresh-production-fallback.mjs
// Reuses the SAME content and template; never maintain a second copy by hand.
import { readFile, writeFile } from 'node:fs/promises';
import { productions, defaultProduction } from './data.js';
import { productionPage } from './pages/production.js';
import { siteRoot } from './paths.js';

const markup = productionPage(productions[defaultProduction]);
for (const path of ['../index.html', '../galaxy-empire/index.html']) {
  const file = new URL(path, import.meta.url);
  const shell = await readFile(file, 'utf8');
  // Browser rendering uses resolved URLs. Static HTML must instead be relative
  // to each entry file, including when all JavaScript is disabled.
  const prefix = path === '../index.html' ? './' : '../';
  const relativeMarkup = markup.replace(/\b(href|src)="([^"]*)"/g, (attribute, name, url) =>
    url.startsWith(siteRoot.href) ? `${name}="${prefix}${url.slice(siteRoot.href.length)}"` : attribute);
  const next = shell.replace(/(<main id="main" tabindex="-1">)[\s\S]*?(<\/main>)/,
    (_, open, close) => `${open}\n${relativeMarkup}\n${close}`);
  await writeFile(file, next);
}
