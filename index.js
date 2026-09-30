import { productions, defaultProduction } from './scripts/data.js';
import { productionPage, mountProduction } from './scripts/pages/production.js';
import { companyPage, mountCompany } from './scripts/pages/company.js';
import { contactPage } from './scripts/pages/contact.js';
import { changeScene } from './scripts/transitions.js';
import { setupNavigation, updateNavigation } from './scripts/navigation.js';
import { siteURL, routePath } from './scripts/paths.js';

const main = document.querySelector('#main');
const productionRoutes = Object.fromEntries(Object.values(productions).map(p => [p.path, {
  title: p.title, theme: p.theme, accent: p.accent, order: 0,
  render: () => productionPage(p), mount: mountProduction,
}]));
const routes = {
  ...productionRoutes,
  '/': productionRoutes[productions[defaultProduction].path],
  '/kompaniet/': { title: 'Kompaniet', theme: 'company', order: 1, render: companyPage, mount: mountCompany },
  '/kontakt/': { title: 'Kontakt', theme: 'contact', order: 2, render: contactPage },
};
const normalize = path => path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
let currentPath = routePath(location.pathname);
let running = false;
let pending = null;
let unmountPage;
const positions = new Map();
history.scrollRestoration = 'manual';
history.replaceState({ ...history.state, sceneKey: history.state?.sceneKey || crypto.randomUUID() }, '', location.href);
let currentKey = history.state.sceneKey;

function restoreScroll(hash, scrollY = 0) {
  const target = hash && document.getElementById(hash.slice(1));
  if (target) {
    target.scrollIntoView();
    if (target === main) main.focus({ preventScroll: true });
  } else window.scrollTo({ top: scrollY, behavior: 'instant' });
}

function render(path, { focus = true, hash = '', scrollY = 0 } = {}) {
  const route = routes[path];
  unmountPage?.();
  document.body.dataset.theme = route.theme;
  if (route.accent) document.body.style.setProperty('--accent', route.accent);
  else document.body.style.removeProperty('--accent');
  main.innerHTML = route.render();
  unmountPage = route.mount?.(main);
  document.title = `${route.title} — Kompani Alterego`;
  updateNavigation(path);
  if (focus) { main.focus({ preventScroll: true }); document.querySelector('#route-status').textContent = route.title; }
  restoreScroll(hash, scrollY);
}
async function navigate(path, options = {}) {
  path = normalize(path);
  if (!routes[path]) { location.assign(siteURL(path)); return; }
  if (running) { pending = { path, options }; return; }
  positions.set(currentKey, window.scrollY);
  // Give anchor entries their own history state, without changing the scene.
  const destination = siteURL(path) + (options.hash || '');
  if (!options.pop && destination !== location.origin + location.pathname + location.hash) {
    history.pushState({ sceneKey: crypto.randomUUID() }, '', destination);
  }
  const nextKey = options.key || history.state?.sceneKey;
  if (path === currentPath) {
    currentKey = nextKey;
    restoreScroll(options.hash, options.pop ? (positions.get(currentKey) || 0) : 0);
    return;
  }
  running = true;
  main.inert = true;
  const from = routes[currentPath];
  const to = routes[path];
  try {
    await changeScene(() => {
      currentKey = nextKey;
      currentPath = path;
      main.inert = false;
      render(path, { hash: options.hash, scrollY: options.pop ? (positions.get(currentKey) || 0) : 0 });
    }, { direction: to.order >= from.order ? 1 : -1, blackout: to.theme === 'contact' || from.theme === 'contact' });
  } finally {
    main.inert = false;
    running = false;
    if (pending) { const next = pending; pending = null; navigate(next.path, next.options); }
  }
}
setupNavigation(navigate);
window.addEventListener('popstate', () => {
  const path = routePath(location.pathname);
  if (path !== null) navigate(path, { pop: true, key: history.state?.sceneKey, hash: location.hash });
});
if (routes[currentPath]) render(currentPath, { focus: false, hash: location.hash });
else { currentPath = '/'; render('/'); }
