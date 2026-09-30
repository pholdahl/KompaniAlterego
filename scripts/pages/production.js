import { siteURL } from '../paths.js';
import { mountTeaser } from '../teaser.js';
import { sectionLabel, footer, arrow } from '../components.js';
import { productionEvidence } from '../production-evidence.js';

const sections = {
  hero: p => `<section class="production-hero" aria-labelledby="production-title">
    <img class="hero-image" src="${siteURL(p.images.hero)}" alt="En skuespiller på scenen, omgitt av blått lys og røyk, med publikum i forgrunnen." width="1200" height="676" fetchpriority="high">
    <div class="hero-topline eyebrow"><span>Presenterer</span><span>En audiovisuell monolog / 01</span></div>
    <h1 id="production-title" class="hero-title"><span>Galaxy</span><span>Empire<span class="title-period">.</span></span></h1>
    <div class="hero-side eyebrow">Mellom spillet og virkeligheten</div>
    <div class="hero-bottom"><p>${p.strapline}</p><a href="#prolog" class="scroll-link">Utforsk forestillingen <span aria-hidden="true">↓</span></a></div>
  </section>`,
  prologue: p => `<section id="prolog" class="prologue section-pad">
    ${sectionLabel('01', 'Prolog', 'reveal')}
    <h2 class="reveal reveal-up">«Jeg har ikke<br>et <em>spillproblem.</em>»</h2>
    <p class="reveal">Det er i hvert fall det han prøver å forklare.</p>
    <div class="track-record" aria-label="Galaxy Empire i tall"><dl class="stagger-group">${p.evidence.trackRecord.map(([number, label]) => `<div class="reveal reveal-up"><dt>${label}</dt><dd class="motion-counter" data-counter="${number.replace(/\D/g, '')}" data-suffix="${number.includes('+') ? '+' : ''}">${number}</dd></div>`).join('')}</dl><p>Spilt i alt fra små klasserom, auditoriumer til store kultursaler.</p></div>
  </section>`,
  performance: p => `<section id="forestillingen" class="performance section-pad">
    ${sectionLabel('02', 'Forestillingen', 'reveal')}
    <div class="editorial-heading reveal reveal-up"><h2>Et helt univers.<br>Et helt vanlig liv.</h2><p class="eyebrow">Teater / Science fiction / Gaming</p></div>
    <figure class="stage-figure"><span class="motion-image-frame"><img class="reveal reveal-scale parallax-image" src="${siteURL(p.images.performance)}" alt="Skuespilleren foran en videoprojeksjon av verdensrommet på en mørk scene." width="1200" height="676" loading="lazy"></span><figcaption><span>Galaxy Empire</span><span>Fra forestillingen</span></figcaption></figure>
    <div class="story-copy"><p class="lead reveal reveal-up">Han skal bli universets beste spiller. Han har en strategi. Og det begynner med bare én runde til.</p><div><p>I Galaxy Empire møter vi en ung hovedperson med store ambisjoner. Spillet åpner en annen virkelighet, der alt virker mulig. Men når ambisjonen vokser, begynner grensene mellom fantasi og hverdag å slå sprekker.</p><p>Teater, videoprojeksjon, lys og lyd møter science fiction og humor. Midt i det store universet finnes en menneskelig historie.</p></div></div>
  </section>`,
  themes: p => `<section class="themes section-pad">
    ${sectionLabel('03', 'Under overflaten')}
    <div class="themes-layout"><div><h2>Når en annen<br>verden blir<br><em>hele verden.</em></h2><p>Om gaming, mobilbruk og flukten inn i noe større. Om unge mennesker, avhengighet og den uklare grensen mellom virkelighet og fantasi.</p><ul class="theme-words" aria-label="Tematikk"><li>Gaming</li><li>Eskapisme</li><li>Tilhørighet</li><li>Avhengighet</li></ul></div><figure><span class="motion-image-frame"><img class="reveal parallax-image" src="${siteURL(p.images.human)}" alt="En sittende skuespiller ser ned på en mobiltelefon i hånden." width="1200" height="676" loading="lazy"></span><figcaption>Et menneske. En skjerm. Et annet sted.</figcaption></figure></div>
  </section>`,
  video: p => `<section id="teaser" class="video-section section-pad stagger-group">
    ${sectionLabel('04', 'Et innblikk', 'reveal')}
    <h2 class="reveal reveal-up">Se teaseren<span class="accent">↘</span></h2>
    <div class="teaser-stage reveal" data-youtube-id="${p.teaser.youtubeId}">
      <button class="video-poster" data-open-video data-video-title="${p.title} — offisiell teaser" aria-label="Spill av ${p.title}-teaseren">
        <img src="${siteURL(p.images.video)}" alt="Varmt scenelys og røyk fra Galaxy Empire." width="1200" height="676" loading="lazy">
        <span class="play-icon reveal" style="--motion-order: 3" aria-hidden="true">▷</span><span class="video-caption eyebrow">Teaser <span>Spill av</span></span>
      </button>
      <div class="teaser-player" hidden></div>
    </div>
    <div class="teaser-controls" hidden><button class="text-link" data-close-video>Lukk video ×</button><a href="${p.teaser.url}" target="_blank" rel="noopener noreferrer">Se på YouTube ↗</a></div>
  </section>`,
  response: productionEvidence,
  tour: p => `<section class="tour section-pad">
    ${sectionLabel('06', 'På veien', 'reveal')}
    <div class="editorial-heading reveal reveal-up"><h2>Et univers<br>på turné.</h2><p class="eyebrow">Fra premieren i 2016</p></div>
    <ol class="tour-timeline timeline-reveal">${p.tour.map(([year, place, note]) => `<li><span class="tour-year">${year}</span><div><h3>${place}</h3>${note ? `<p>${note}</p>` : ''}</div></li>`).join('')}</ol>
    ${p.otherVenues?.length ? `<div class="other-venues"><h3 class="eyebrow">Andre spillesteder</h3><ul>${p.otherVenues.map(([venue, type]) => `<li><span>${venue}</span><span class="venue-type">${type}</span></li>`).join('')}</ul></div>` : ''}
  </section>`,
  practical: p => `<section id="praktisk" class="practical section-pad">
    ${sectionLabel('07', 'For arrangører')}
    <div class="practical-layout"><div><h2 class="reveal">På din<br>scene?</h2><p>Galaxy Empire er aktuell for Den kulturelle skolesekken og for andre arrangører.</p></div><dl class="practical-facts stagger-group">${p.practical.map(([field, value]) => `<div class="reveal"><dt>${field}</dt><dd>${value}</dd></div>`).join('')}</dl></div>
    <div class="practical-ending"><p>Andre praktiske opplysninger avtaler vi over e-post.</p><a class="text-link reveal" href="${siteURL('kontakt/')}" data-route>Ta Galaxy Empire med til dere ${arrow}</a></div>
  </section>`,
};
export function productionPage(production) {
  return production.sections.map(key => sections[key](production)).join('') + footer();
}
export function mountProduction(root) {
  mountTeaser(root);
  let cancelled = false;
  let stopMotion;
  // A failed optional import must never prevent content or the teaser from working.
  import('../motion.js').then(({ mountMotion }) => {
    if (!cancelled) stopMotion = mountMotion(root);
  }).catch(error => console.warn('Scroll motion unavailable; showing the static page.', error));
  return () => { cancelled = true; stopMotion?.(); };
}