'use strict';
(() => {
  const links = [...document.querySelectorAll('[data-gallery-open]')];
  const dialog = document.querySelector('.gallery-lightbox');
  if (!links.length || !dialog) return;

  const cards = [...document.querySelectorAll('[data-gallery-card]')];
  const filters = document.querySelector('[data-gallery-filters]');
  const filterButtons = [...document.querySelectorAll('[data-gallery-filter]')];
  const resultCount = document.querySelector('[data-gallery-count]');
  if (filters) filters.hidden = false;
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.galleryFilter;
      filterButtons.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
      cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
      const count = cards.filter(card => !card.hidden).length;
      resultCount.textContent = `${count} ${count === 1 ? 'photo' : 'photos'}`;
    });
  });

  const photo = dialog.querySelector('[data-gallery-image]');
  const photoWrap = dialog.querySelector('[data-gallery-image-wrap]');
  const loading = dialog.querySelector('[data-gallery-loading]');
  const error = dialog.querySelector('[data-gallery-error]');
  const title = dialog.querySelector('[data-gallery-title]');
  const caption = dialog.querySelector('[data-gallery-caption]');
  const position = dialog.querySelector('[data-gallery-position]');
  const originalLink = dialog.querySelector('[data-gallery-original]');
  const previous = dialog.querySelector('[data-gallery-previous]');
  const next = dialog.querySelector('[data-gallery-next]');
  let visibleLinks = [];
  let currentIndex = 0;
  let opener = null;

  function showPhoto(index) {
    currentIndex = (index + visibleLinks.length) % visibleLinks.length;
    const selected = visibleLinks[currentIndex];
    photo.hidden = true;
    loading.hidden = false;
    error.hidden = true;
    photoWrap.setAttribute('aria-busy', 'true');
    title.textContent = selected.dataset.title;
    caption.textContent = selected.dataset.caption;
    caption.hidden = !selected.dataset.caption;
    position.textContent = `${currentIndex + 1} / ${visibleLinks.length}`;
    originalLink.href = selected.href;
    photo.alt = selected.dataset.title;
    photo.src = selected.href;
    previous.disabled = next.disabled = visibleLinks.length < 2;
  }

  photo.addEventListener('load', () => {
    photo.hidden = false;
    loading.hidden = true;
    error.hidden = true;
    photoWrap.setAttribute('aria-busy', 'false');
  });
  photo.addEventListener('error', () => {
    photo.hidden = true;
    loading.hidden = true;
    error.hidden = false;
    photoWrap.setAttribute('aria-busy', 'false');
  });

  links.forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      opener = link;
      visibleLinks = links.filter(candidate => !candidate.closest('[data-gallery-card]').hidden);
      showPhoto(visibleLinks.indexOf(link));
      dialog.showModal();
      document.documentElement.classList.add('gallery-is-open');
    });
  });

  previous.addEventListener('click', () => showPhoto(currentIndex - 1));
  next.addEventListener('click', () => showPhoto(currentIndex + 1));
  dialog.querySelector('[data-gallery-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('gallery-is-open');
    opener?.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(currentIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(currentIndex + 1); }
  });

  let touch = null;
  const stage = dialog.querySelector('[data-gallery-stage]');
  stage.addEventListener('touchstart', event => {
    if (event.touches.length === 1) touch = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (!touch || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touch.x;
    const dy = event.changedTouches[0].clientY - touch.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) showPhoto(currentIndex + (dx < 0 ? 1 : -1));
    touch = null;
  }, { passive: true });
})();
