import { sectionLabel } from './components.js';

function quotation(quote, source, className = '') {
  return `<figure class="testimonial ${className}"><blockquote>«${quote}»</blockquote><figcaption>— ${source}</figcaption></figure>`;
}

export function productionEvidence(production) {
  const { research, review } = production.evidence;
  const schools = production.testimonials;
  return `<section id="respons" class="response section-pad">
    ${sectionLabel('05', 'Respons / Forskning', 'reveal')}
    <h2 class="reveal">Elevenes opplevelse</h2>
    <p class="research-overview reveal">I Kulturtankens forskningsrapport får Galaxy Empire mange positive tilbakemeldinger. Analysen fremhever skuespillerens innlevelse, lydeffektene og gjenkjenneligheten i gaming-tematikken.</p>
    <div class="student-voices stagger-group">${research.quotes.map(quote => quotation(quote, 'Enkeltelev sitert i forskningsrapporten', 'reveal')).join('')}</div>
    <aside class="research-attribution stagger-group" aria-label="Forskningsrapport"><div class="reveal"><h3 class="eyebrow">${research.attribution}</h3><p>Galaxy Empire var én av tre produksjoner i en kvalitativ studie av DKS-opplevelser blant ungdomsskoleelever. Studien omfattet 15 skoleklasser på tvers av de tre produksjonene, med Galaxy Empire representert ved to skoler.</p></div><a class="text-link reveal" href="${research.url}" target="_blank" rel="noopener noreferrer" aria-label="Les rapporten (PDF, åpnes i ny fane)">Les rapporten <span aria-hidden="true">→</span></a></aside>
    <article class="review-excerpt" aria-labelledby="review-label"><h3 id="review-label" class="eyebrow">Anmeldelse / ${review.attribution}</h3>${quotation(review.excerpt, `Utdrag fra ${review.attribution}`, 'testimonial-featured reveal reveal-up')}<a class="text-link" href="${review.url}" target="_blank" rel="noopener noreferrer">Les hele anmeldelsen <span aria-hidden="true">↗</span></a></article>
    <div class="school-feedback"><h3 class="eyebrow">Fra skolene / 2017–2020</h3>
      <div class="school-highlights stagger-group">${[schools[0], schools[3]].map(item => quotation(item.quote, item.source, 'testimonial-featured reveal reveal-up')).join('')}</div>
      <details class="school-comments"><summary>Flere tilbakemeldinger fra skolene <span class="comment-count">(5)</span><span class="disclosure-mark" aria-hidden="true">+</span></summary><div class="testimonials-voices">${schools.filter((_, index) => index !== 0 && index !== 3).map(item => quotation(item.quote, item.source)).join('')}</div></details>
    </div>
  </section>`;
}