import { siteURL } from './paths.js';

// Keep the original A and E separate for future positioning or animation.
export function logoSymbol() {
  return `<span class="ae-symbol" aria-hidden="true">
    <img class="ae-symbol-a" src="${siteURL('assets/images/brand/Alogo.png')}" alt="" width="884" height="1379">
    <img class="ae-symbol-e" src="${siteURL('assets/images/brand/ELogo.png')}" alt="" width="615" height="1379">
  </span>`;
}
export function mountBrand() {
  document.querySelectorAll('[data-brand-symbol]').forEach(slot => {
    slot.innerHTML = logoSymbol();
  });
}
