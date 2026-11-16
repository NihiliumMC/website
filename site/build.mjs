import fs from 'node:fs';
import path from 'node:path';

import { about } from './content/about.mjs';
import { renderPage } from './content/layout.mjs';
import { privacy, renderLegalPage, terms } from './content/legal.mjs';
import { home } from './content/home.mjs';
import { notFound } from './content/not-found.mjs';
import { galleryDialog, galleryPage } from './gallery.mjs';

const root = import.meta.dirname;
const output = path.join(root, 'dist');

/** Copy the static assets and write every generated HTML page. */
function build() {
  prepareOutputDirectory();

  const pages = [
    {
      file: 'gallery.html',
      title: 'Gallery — Nihilium Anarchy',
      description: 'Photos from the Nihilium Minecraft server: spawn, player builds, world border visits, and map art.',
      page: 'gallery',
      body: galleryPage(),
      galleryDialog,
    },
    {
      file: 'index.html',
      title: 'Nihilium Anarchy — A world without limits',
      description: 'An open Minecraft anarchy world, shaped by its players. Join Nihilium on Java and Bedrock, check live player status, and make your mark.',
      page: 'home',
      body: home,
      galleryDialog,
    },
    {
      file: 'about.html',
      title: 'About us — Nihilium Anarchy',
      description: 'The history of Nihilium, a Minecraft anarchy server running since January 2025. Meet the team and get in touch.',
      page: 'about',
      body: about,
    },
    {
      file: 'terms.html',
      title: 'Terms of Service — Nihilium Anarchy',
      description: 'Read the Terms of Service for the Nihilium Minecraft and Discord server.',
      page: 'terms',
      body: renderLegalPage('Terms of Service', terms),
    },
    {
      file: 'privacy.html',
      title: 'Privacy Policy — Nihilium Anarchy',
      description: 'Read how Nihilium collects, uses, and stores player and website data.',
      page: 'privacy',
      body: renderLegalPage('Privacy Policy', privacy),
    },
  ];

  for (const page of pages) writePage(page);

  // The old site used tos.html; keep it working as an alias for terms.html.
  fs.copyFileSync(path.join(output, 'terms.html'), path.join(output, 'tos.html'));

  writePage({
    file: '404.html',
    title: 'Page not found — Nihilium',
    description: 'Find your way back to Nihilium.',
    page: '404',
    body: notFound,
  });

  console.log(`Generated ${pages.length} pages, a terms alias, and the 404 page.`);
}

function prepareOutputDirectory() {
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(output, { recursive: true });
  fs.cpSync(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
}

function writePage({ file, title, description, page, body, galleryDialog: dialog }) {
  const html = renderPage({ title, description, page, body, galleryDialog: dialog });
  fs.writeFileSync(path.join(output, file), html);
}

build();
