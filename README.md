# Nihilium website

The Nihilium Anarchy website, built with [Astro](https://astro.build/).

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The generated site is written to `dist/`.

## Gallery

Gallery metadata lives in `src/data/gallery.json`. Original images live in
`src/assets/gallery/`; Astro generates the responsive thumbnails and full-size
WebP versions during the build.

## Deployment

The site is deployed on Vercel. The Vercel project root directory should be the
repository root. Astro is detected automatically, and the build outputs to
`dist/`.
