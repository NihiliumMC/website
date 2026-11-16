import { icon } from './layout.mjs';

export const about = `<main class="inner-main page-width">
  <a href="/" class="back-link">← Home</a>
  <div class="inner-title"><h1>About <span>Nihilium.</span></h1></div>

  <article class="about-story glass">
    <div class="about-story-copy">
      <h2>Nihilium</h2>
      <p>Nihilium is a Minecraft anarchy server with truly no limits. The server has been running mostly continuously since Thu Jan 09 2025 with varying playercount. The world is about 800 GB in size and the world border was reached for the first time Tue Feb 25 2025.</p>
      <p>The server is owned by <strong>Hausemasteer</strong> and developed by <a href="https://beveledcube.vercel.app/" target="_blank" rel="noopener noreferrer">BeveledCube ${icon('external')}</a>.</p>
    </div>
    <div class="about-stats">
      <div><strong>09.01.2025</strong><span>Our story begins</span></div>
      <div><strong>~800 GB</strong><span>A world of player history</span></div>
      <div><strong>25.02.2025</strong><span>World border first reached</span></div>
    </div>
  </article>

  <section class="contact-section" aria-labelledby="contact-heading">
    <div class="section-heading"><div><h2 id="contact-heading">Contact us.</h2></div></div>
    <div class="contact-grid">
      <article class="contact-card glass">
        ${icon('discord')}
        <h3>Discord</h3>
        <button class="contact-copy" data-copy="beveledcube">beveledcube ${icon('copy')}</button>
        <a class="text-link" href="https://discord.gg/nihilium" target="_blank" rel="noopener noreferrer">Join the community ${icon('external')}</a>
      </article>
      <article class="contact-card glass">
        ${icon('mail')}
        <h3>Mail</h3>
        <a class="contact-value" href="mailto:admin@nihilium.org">admin@nihilium.org</a>
        <a class="text-link" href="mailto:admin@nihilium.org">Send an email ${icon('external')}</a>
      </article>
      <article class="contact-card glass">
        ${icon('chat')}
        <h3><a href="https://stoat.chat/" target="_blank" rel="noopener noreferrer">Stoat ${icon('external')}</a></h3>
        <button class="contact-copy" data-copy="beveledcube#0622">beveledcube#0622 ${icon('copy')}</button>
        <button class="contact-copy" data-copy="Hausemasteer#1393">Hausemasteer#1393 ${icon('copy')}</button>
      </article>
      <article class="contact-card glass">
        ${icon('chat')}
        <h3><a href="https://signal.org/" target="_blank" rel="noopener noreferrer">Signal ${icon('external')}</a></h3>
        <button class="contact-copy" data-copy="BeveledCube.01">BeveledCube.01 ${icon('copy')}</button>
        <button class="contact-copy" data-copy="hausemasteer.81">hausemasteer.81 ${icon('copy')}</button>
      </article>
    </div>
  </section>
</main>`;
