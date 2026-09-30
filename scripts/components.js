import { logoSymbol } from './brand.js';

export const arrow = '<span aria-hidden="true">↗</span>';
export function sectionLabel(number, label, motionClass = '') {
  return `<p class="section-label${motionClass ? ` ${motionClass}` : ''}"><span>${number}</span>${label}</p>`;
}
export function footer() {
  return `<footer class="site-footer"><a class="brand-lockup wordmark" href="/" data-route aria-label="Kompani Alterego — hjem">${logoSymbol()}<span>KOMPANI ALTEREGO</span></a><span>Scenekunst. Audiovisuelle produksjoner.</span><a href="/kontakt/" data-route>Kontakt ${arrow}</a></footer>`;
}
