import fs from 'node:fs';

const images = JSON.parse(fs.readFileSync(new URL('./gallery.json', import.meta.url), 'utf8'));
const categories = [
  ['all', 'All photos'],
  ['spawn', 'Spawn'],
  ['builds', 'Builds & bases'],
  ['border', 'World border'],
  ['mapart', 'Map art'],
];
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const externalIcon = '<svg class="icon" aria-hidden="true"><use href="#i-external"/></svg>';
const categoryName = key => categories.find(([id]) => id === key)?.[1] ?? key;

function card(photo) {
  return `<article class="gallery-card glass" data-gallery-card data-category="${escapeHtml(photo.category)}"><a class="gallery-photo" href="${escapeHtml(photo.original)}" data-gallery-open data-title="${escapeHtml(photo.title)}" data-caption="${escapeHtml(photo.caption)}" aria-label="View ${escapeHtml(photo.title)}"><span class="gallery-media ${photo.category === 'mapart' ? 'gallery-media-mapart' : ''}"><img src="${escapeHtml(photo.thumbnail)}" alt="${escapeHtml(photo.title)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"><span class="gallery-expand" aria-hidden="true">${externalIcon}</span></span><span class="gallery-caption"><span class="gallery-card-category">${escapeHtml(categoryName(photo.category))}</span><span class="gallery-card-title">${escapeHtml(photo.title)}</span>${photo.caption ? `<span class="gallery-card-credit">${escapeHtml(photo.caption)}</span>` : ''}</span></a></article>`;
}

export function galleryPreview(icon) {
  return `<section class="gallery-section page-width" aria-labelledby="gallery-heading"><div class="section-heading gallery-section-heading"><h2 id="gallery-heading">Gallery</h2><a class="text-link" href="/gallery.html">View all ${images.length} photos ${icon('arrow')}</a></div><div class="gallery-grid gallery-preview">${images.filter(image => image.home).map(card).join('')}</div></section>`;
}

export function galleryPage() {
  return `<main class="inner-main gallery-main page-width"><a href="/" class="back-link">← Home</a><div class="inner-title gallery-title"><h1>Gallery</h1><p>Images from the server.</p></div><div class="gallery-toolbar"><div class="gallery-filters" role="group" aria-label="Filter gallery photos" data-gallery-filters hidden>${categories.map(([id, label]) => `<button class="gallery-filter" type="button" data-gallery-filter="${id}" aria-pressed="${id === 'all'}">${escapeHtml(label)} <span>${id === 'all' ? images.length : images.filter(image => image.category === id).length}</span></button>`).join('')}</div><p class="gallery-result-count" data-gallery-count role="status" aria-live="polite">${images.length} photos</p></div><div class="gallery-grid">${images.map(card).join('')}</div></main>`;
}

export const galleryDialog = `<dialog class="gallery-lightbox" aria-labelledby="gallery-view-title"><div class="lightbox-shell"><div class="lightbox-toolbar"><span class="lightbox-counter" data-gallery-position></span><div class="lightbox-actions"><a class="lightbox-original" data-gallery-original target="_blank" rel="noopener noreferrer">Original image ${externalIcon}</a><button type="button" class="lightbox-close" data-gallery-close aria-label="Close photo viewer" autofocus>×</button></div></div><div class="lightbox-stage" data-gallery-stage><button type="button" class="lightbox-arrow lightbox-previous" data-gallery-previous aria-label="Previous photo">←</button><div class="lightbox-image-wrap" aria-busy="false" data-gallery-image-wrap><img class="lightbox-image" data-gallery-image alt=""><p class="lightbox-loading" data-gallery-loading hidden>Loading photo…</p><p class="lightbox-error" data-gallery-error hidden>This photo could not load. Try opening the original image.</p></div><button type="button" class="lightbox-arrow lightbox-next" data-gallery-next aria-label="Next photo">→</button></div><div class="lightbox-caption"><h2 id="gallery-view-title" data-gallery-title></h2><p data-gallery-caption></p></div></div></dialog>`;
