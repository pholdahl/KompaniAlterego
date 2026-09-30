// No third-party player or request until the visitor activates the scenic poster.
export function mountTeaser(root) {
  const stage = root.querySelector('.teaser-stage');
  const poster = stage.querySelector('[data-open-video]');
  const player = stage.querySelector('.teaser-player');
  const tools = root.querySelector('.teaser-controls');
  const close = tools.querySelector('[data-close-video]');
  poster.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${stage.dataset.youtubeId}?autoplay=1&playsinline=1&rel=0`;
    iframe.title = poster.dataset.videoTitle;
    iframe.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    player.replaceChildren(iframe);
    poster.hidden = true;
    player.hidden = false;
    tools.hidden = false;
    iframe.focus();
  });
  close.addEventListener('click', () => {
    player.replaceChildren(); // Removing the iframe also stops its audio.
    player.hidden = true;
    tools.hidden = true;
    poster.hidden = false;
    poster.focus({ preventScroll: true });
  });
}
