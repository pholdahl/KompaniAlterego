// This module is always in scripts/, one directory below the site root.
// Its URL discovers the hosting folder; no domain or repository name is needed.
export const siteRoot = new URL('../', import.meta.url);

// Asset paths are relative to the site root. Route keys may start with '/'.
export function siteURL(path = '') {
  return new URL(path.replace(/^\/+/, ''), siteRoot).href;
}

// Convert a browser pathname to the existing logical route keys, e.g. /kontakt/.
// A path outside this installation is not handled by the site's router.
export function routePath(pathname) {
  if (!pathname.startsWith(siteRoot.pathname)) return null;
  const relative = pathname.slice(siteRoot.pathname.length).replace(/index\.html$/, '');
  return relative ? `/${relative.replace(/\/+$/, '')}/` : '/';
}
