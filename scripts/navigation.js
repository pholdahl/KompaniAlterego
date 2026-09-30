import { mountBrand } from './brand.js';
import { routePath } from './paths.js';

export function setupNavigation(navigate) {
  // Resolve the shell's relative links once, before pushState changes the URL.
  // Their destinations then stay stable while the persistent header stays put.
  document.querySelectorAll('[data-route]').forEach(link => { link.href = link.href; });
  mountBrand();
  const menu = document.querySelector('#mobile-menu');
  const toggle = document.querySelector('.menu-toggle');
  const close = () => menu.close();
  toggle.addEventListener('click', () => { menu.showModal(); toggle.setAttribute('aria-expanded', 'true'); });
  document.querySelector('[data-close-menu]').addEventListener('click', close);
  menu.addEventListener('close', () => toggle.setAttribute('aria-expanded', 'false'));
  window.matchMedia('(min-width: 1100px)').addEventListener('change', event => {
    if (event.matches && menu.open) {
      close();
      document.querySelector('.site-header .brand-lockup').focus({ preventScroll: true });
    }
  });
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin) return;
    const path = routePath(url.pathname);
    if (path === null) return;
    const localAnchor = url.pathname === location.pathname && url.hash;
    if (!link.hasAttribute('data-route') && !localAnchor) return;
    event.preventDefault();
    if (menu.open) close();
    navigate(path, { hash: url.hash });
  });
}
export function updateNavigation(path) {
  const activePath = path === '/' ? '/galaxy-empire/' : path;
  document.querySelectorAll('nav [data-route]').forEach(link => {
    if (routePath(new URL(link.href).pathname) === activePath) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
