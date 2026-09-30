import { siteURL } from '../paths.js';
import { people } from '../data.js';
import { sectionLabel, footer, arrow } from '../components.js';

// Optional links use only curated destinations supplied with the profile content.
function externalLink(label, url) {
  return `<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${label} (åpnes i ny fane)">${label} <span aria-hidden="true">↗</span></a>`;
}

function portrait(person, className) {
  return `<img class="${className}" src="${siteURL(person.image)}" alt="${person.alt}"
    width="${person.width}" height="${person.height}" loading="lazy" decoding="async"
    style="--portrait-position:${person.position};--portrait-face-position:${person.facePosition};--portrait-face-scale:${person.faceScale}">`;
}
function personPanel(person, index) {
  return `<button class="portrait-panel" id="person-${person.id}" data-person="${person.id}"
      style="--panel-column:${index + 1}" aria-expanded="false" aria-controls="profile-${person.id}"
      aria-label="Møt ${person.name}, ${person.role}">
    <span class="portrait-frame">${portrait(person, 'ensemble-portrait')}<span class="portrait-number" aria-hidden="true">0${index + 1}</span></span>
    <span class="portrait-caption">
      <span class="portrait-name">${person.name}</span>
      <span class="portrait-role">${person.role}</span>
      <span class="portrait-affordance"><span data-profile-label>Se profil</span><span aria-hidden="true">↗</span></span>
    </span>
  </button>
  <section class="individual-profile" id="profile-${person.id}" aria-labelledby="profile-title-${person.id}" hidden>
    <div class="individual-image">${portrait(person, 'profile-portrait')}</div>
    <div class="individual-copy">
      <button class="profile-close" data-close-profile="${person.id}">Tilbake til ensemblet <span aria-hidden="true">×</span></button>
      <p class="eyebrow">Kompani Alterego / 0${index + 1}</p>
      <h3 id="profile-title-${person.id}" tabindex="-1">${person.name}</h3>
      <p class="individual-role">${person.role}</p>
      <div class="individual-biography">${person.biography ? (Array.isArray(person.biography) ? person.biography : [person.biography]).map(paragraph => `<p>${paragraph}</p>`).join('') : '<p class="eyebrow">Biografi kommer</p><p>Her kommer en personlig presentasjon av bakgrunn, praksis og arbeidet i kompaniet.</p>'}${person.biographyLinks?.length ? `<p class="eyebrow">${person.biographyLinks.map(([label, url]) => externalLink(label, url)).join(' · ')}</p>` : ''}</div>
    </div>
    ${person.selectedWorks?.length ? `<section class="selected-works" aria-labelledby="works-${person.id}"><h4 id="works-${person.id}" class="eyebrow">Utvalgte arbeider</h4><dl>${person.selectedWorks.map(([title, role, url]) => `<div><dt>${url ? externalLink(title, url) : title}</dt><dd>${role}</dd></div>`).join('')}</dl></section>` : ''}
  </section>`;
}
export function companyPage() {
  return `<section class="company-intro section-pad">${sectionLabel('01', 'Menneskene bak')}<h1>Kompaniet<span>.</span></h1><div class="company-statement"><p class="lead">Ett kompani.<br>Flere alter ego.</p><p>Kompani Alterego er et Oslo-basert scenekunstkompani som arbeider på tvers av teater, teknologi og audiovisuelle uttrykk. Vi liker å utforske hva som skjer når skuespilleren, teknikken og fortellingen får spille sammen på scenen.</p></div></section>
  <section class="people section-pad">
    <div class="people-heading"><p class="eyebrow">Velg et menneske.<br>Møt et alter ego.</p></div>
    <div class="ensemble-stage" role="group" aria-label="Ensemblet">${people.map(personPanel).join('')}</div>
  </section><section class="company-production section-pad">${sectionLabel('02', 'På scenen nå')}<a href="${siteURL('galaxy-empire/')}" data-route><span>Galaxy Empire</span>${arrow}</a><p>Gå inn i forestillingens univers.</p></section>${footer()}`;
}

export function mountCompany(root) {
  const section = root.querySelector('.people');
  const stage = section.querySelector('.ensemble-stage');
  const buttons = [...stage.querySelectorAll('.portrait-panel')];
  let selectedId = null;
  let hoveredId = null;

  function emphasize(id) {
    stage.style.setProperty('--panel-columns', buttons.map(button => button.dataset.person === id ? '2.8fr' : '1fr').join(' '));
    buttons.forEach(button => {
      button.classList.toggle('is-emphasized', button.dataset.person === id);
      button.classList.toggle('is-receded', Boolean(id) && button.dataset.person !== id);
    });
  }
  function restoreEmphasis() {
    const focused = buttons.find(button => button.matches(':focus-visible'));
    emphasize(focused?.dataset.person || hoveredId || selectedId);
  }
  function selectPerson(id, moveFocus = true) {
    const person = people.find(person => person.id === id);
    selectedId = person?.id || null;
    section.classList.toggle('has-profile', Boolean(person));
    for (const token of ['background', 'ink', 'muted', 'accent']) {
      if (person) section.style.setProperty(`--ensemble-${token}`, person.theme[token]);
      else section.style.removeProperty(`--ensemble-${token}`);
    }
    buttons.forEach(button => {
      const open = button.dataset.person === selectedId;
      const member = people.find(p => p.id === button.dataset.person);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', `${open ? 'Lukk profil for' : 'Møt'} ${member.name}, ${member.role}`);
      root.querySelector(`#${button.getAttribute('aria-controls')}`).hidden = !open;
      button.querySelector('[data-profile-label]').textContent = open ? 'Lukk profil' : 'Se profil';
    });
    emphasize(selectedId);
    if (person && moveFocus) {
      const profile = root.querySelector(`#profile-${person.id}`);
      // On stacked layouts keep the selected portrait/caption above its biography.
      const desktop = window.matchMedia('(min-width: 1100px)').matches;
      if (desktop) {
        profile.querySelector('h3').focus({ preventScroll: true });
        profile.scrollIntoView({ block: 'start', behavior: 'instant' });
      } else {
        const trigger = root.querySelector(`#person-${person.id}`);
        trigger.focus({ preventScroll: true });
        trigger.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
    }
  }
  buttons.forEach(button => {
    button.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      hoveredId = button.dataset.person;
      emphasize(hoveredId);
    });
    button.addEventListener('pointerleave', () => { hoveredId = null; restoreEmphasis(); });
    button.addEventListener('focus', () => emphasize(button.dataset.person));
    button.addEventListener('blur', restoreEmphasis);
    button.addEventListener('click', () => selectPerson(selectedId === button.dataset.person ? null : button.dataset.person));
  });
  function closeProfile() {
    const previous = selectedId;
    if (!previous) return;
    selectPerson(null, false);
    const button = root.querySelector(`#person-${previous}`);
    button.focus({ preventScroll: true });
    button.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }
  stage.querySelectorAll('[data-close-profile]').forEach(button => button.addEventListener('click', closeProfile));
  stage.addEventListener('keydown', event => {
    if (event.key === 'Escape' && selectedId) { event.preventDefault(); closeProfile(); }
  });
}
