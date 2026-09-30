// Scroll effects are independent of navigation and the scene curtain.
// CSS durations/distances/easing live together at the top of css/motion.css.
export const MOTION_CONFIG = {
  counterDuration: 900,
  observerThreshold: 0.22,
  observerRootMargin: '0px 0px -24px 0px',
  maxStaggerSteps: 3,
  parallaxMinWidth: 1100,
  parallaxStrength: 0.025,
  parallaxMaxPixels: 12,
};

export function mountMotion(root) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia(`(min-width: ${MOTION_CONFIG.parallaxMinWidth}px)`);
  // Missing APIs/CSS or reduced motion leave the complete static page alone.
  if (reduced.matches || !window.IntersectionObserver ||
      !getComputedStyle(root).getPropertyValue('--motion-medium').trim()) return () => {};

  let disposed = false;
  let scrollFrame = 0;
  let revealObserver;
  let imageObserver;
  const counterJobs = new Map();
  const visibleImages = new Set();
  const images = [...root.querySelectorAll('.parallax-image')];
  const ordered = new Set();
  const targets = [...root.querySelectorAll('.reveal, .motion-counter[data-counter], .timeline-reveal > li')];

  // Only explicitly marked groups stagger. Their children still need `reveal`.
  root.querySelectorAll('.stagger-group, .timeline-reveal').forEach(group => {
    [...group.children].filter(child => child.matches('.reveal, li')).forEach((child, index) => {
      child.style.setProperty('--motion-order', Math.min(index, MOTION_CONFIG.maxStaggerSteps));
      ordered.add(child);
    });
  });

  function finishCounter(element) {
    const job = counterJobs.get(element);
    if (!job) return;
    cancelAnimationFrame(job.frame);
    element.textContent = job.finalText;
    element.classList.remove('is-counting');
    counterJobs.delete(element);
  }

  function count(element) {
    const finalText = element.textContent;
    const value = Number(element.dataset.counter);
    if (!Number.isFinite(value) || value < 0) return;
    const suffix = element.dataset.suffix || '';
    // The original final number stays accessible and reserves the full width.
    const final = document.createElement('span');
    final.className = 'counter-final';
    final.textContent = finalText;
    const animated = document.createElement('span');
    animated.className = 'counter-animated';
    animated.setAttribute('aria-hidden', 'true');
    animated.textContent = `0${suffix}`;
    element.replaceChildren(final, animated);
    element.classList.add('is-counting');
    const job = { frame: 0, finalText, start: null };
    counterJobs.set(element, job);
    function tick(now) {
      if (disposed || reduced.matches || !element.matches('.motion-counter[data-counter]')) {
        finishCounter(element); return;
      }
      job.start ??= now;
      const progress = Math.min((now - job.start) / MOTION_CONFIG.counterDuration, 1);
      const number = Math.round(value * (1 - Math.pow(1 - progress, 3)));
      animated.textContent = String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + suffix;
      if (progress < 1) job.frame = requestAnimationFrame(tick);
      else finishCounter(element); // Restore exact source formatting, including spaces.
    }
    job.frame = requestAnimationFrame(tick);
  }

  function reveal(element) {
    if (element.classList.contains('is-revealed')) return;
    element.classList.add('is-revealed');
    revealObserver.unobserve(element); // One shot per page visit; never replay on scroll-back.
    if (element.matches('.motion-counter[data-counter]')) count(element);
  }

  // Keyboard focus must never land on an invisible link or play control.
  function onFocus(event) {
    targets.filter(element => element.contains(event.target)).forEach(reveal);
  }

  // Two opt-in images only. Read all rectangles first, then write transforms.
  // A frame is requested by scrolling/resizing/intersection, never an idle loop.
  function updateImages() {
    scrollFrame = 0;
    if (disposed || !desktop.matches) return;
    const updates = [...visibleImages].filter(image => image.matches('.parallax-image')).map(image => {
      const rect = image.parentElement.getBoundingClientRect();
      const limit = Math.min(MOTION_CONFIG.parallaxMaxPixels, rect.height * MOTION_CONFIG.parallaxStrength);
      const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - rect.top - rect.height / 2) / ((innerHeight + rect.height) / 2)));
      return { image, y: progress * limit, scale: rect.height ? 1 + (2 * limit / rect.height) : 1 };
    });
    updates.forEach(({ image, y, scale }) => {
      image.classList.add('is-parallax-active');
      image.style.setProperty('--parallax-y', `${y}px`);
      image.style.setProperty('--parallax-scale', scale);
    });
  }
  function scheduleImages() {
    if (!disposed && desktop.matches && visibleImages.size && !scrollFrame) {
      scrollFrame = requestAnimationFrame(updateImages);
    }
  }
  function resetImages() {
    images.forEach(image => {
      image.classList.remove('is-parallax-active');
      image.style.removeProperty('--parallax-y');
      image.style.removeProperty('--parallax-scale');
    });
  }
  function onWidthChange() { resetImages(); scheduleImages(); }

  // Route cleanup and preference changes both restore the static complete page.
  function cleanup() {
    disposed = true;
    root.classList.remove('motion-ready');
    revealObserver?.disconnect();
    imageObserver?.disconnect();
    cancelAnimationFrame(scrollFrame);
    [...counterJobs.keys()].forEach(finishCounter);
    ordered.forEach(element => element.style.removeProperty('--motion-order'));
    resetImages();
    root.removeEventListener('focusin', onFocus);
    window.removeEventListener('scroll', scheduleImages);
    window.removeEventListener('resize', scheduleImages);
    desktop.removeEventListener('change', onWidthChange);
    reduced.removeEventListener('change', onPreferenceChange);
  }
  function onPreferenceChange() { if (reduced.matches) cleanup(); }

  try {
    revealObserver = new IntersectionObserver(entries => {
      entries.filter(entry => entry.isIntersecting).forEach(entry => reveal(entry.target));
    }, { threshold: MOTION_CONFIG.observerThreshold, rootMargin: MOTION_CONFIG.observerRootMargin });
    targets.forEach(element => revealObserver.observe(element));
    // Observe frames, but store their image: the frame itself never transforms.
    imageObserver = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        const image = target.querySelector('.parallax-image');
        if (!image) return;
        if (isIntersecting) visibleImages.add(image);
        else visibleImages.delete(image);
      });
      scheduleImages();
    });
    images.forEach(image => imageObserver.observe(image.parentElement));
    root.addEventListener('focusin', onFocus);
    window.addEventListener('scroll', scheduleImages, { passive: true });
    window.addEventListener('resize', scheduleImages, { passive: true });
    desktop.addEventListener('change', onWidthChange);
    reduced.addEventListener('change', onPreferenceChange);
    root.classList.add('motion-ready'); // Last step: failures above never hide content.
  } catch (error) {
    cleanup();
    throw error;
  }
  return cleanup;
}
