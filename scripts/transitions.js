const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const curtain = document.querySelector('.scene-curtain');

// Cover → change scene → reveal. No animation dependency and no hidden scroll content.
export async function changeScene(swap, { direction = 1, blackout = false } = {}) {
  if (reducedMotion.matches || !curtain.animate) { swap(); return; }
  curtain.classList.add('is-running');
  curtain.classList.toggle('is-blackout', blackout);
  const options = { duration: 400, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' };
  let enter;
  let leave;
  try {
    enter = curtain.animate(blackout ? [{ opacity: 0 }, { opacity: 1 }] : [{ transform: `translateX(${-direction * 100}%)` }, { transform: 'translateX(0)' }], options);
    await enter.finished;
    swap();
    leave = curtain.animate(blackout ? [{ opacity: 1 }, { opacity: 0 }] : [{ transform: 'translateX(0)' }, { transform: `translateX(${direction * 100}%)` }], options);
    await leave.finished;
  } finally {
    enter?.cancel();
    leave?.cancel();
    curtain.classList.remove('is-running', 'is-blackout');
  }
}
