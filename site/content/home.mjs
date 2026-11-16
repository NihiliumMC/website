import { galleryPreview } from '../gallery.mjs';
import { icon } from './layout.mjs';

export const home = `<main>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-landscape" role="img" aria-label="Nihilium Minecraft spawn, with towering lava falls and player-built paths"></div>
    <div class="hero-shade"></div>
    <div class="hero-content page-width">
      <div class="hero-copy">
        <h1 id="hero-title">A world<br>without <span>limits.</span></h1>
        <p class="hero-description">A Minecraft anarchy server for Java and Bedrock.</p>
        <div class="hero-actions">
          <button class="button button-light" data-copy="nihilium.org">Copy server IP ${icon('copy')}</button>
          <a class="button button-glass" href="https://discord.gg/nihilium" target="_blank" rel="noopener noreferrer">${icon('discord')} Join our Discord ${icon('external')}</a>
        </div>
      </div>
      <aside class="live-card glass" aria-label="Live server status">
        <div class="live-top">
          <span class="status-badge" data-status-badge><i class="status-dot" data-status-dot></i><span data-status-label>CHECKING STATUS</span></span>
          <button class="refresh-button" data-refresh aria-label="Refresh server status" title="Refresh server status">${icon('refresh')}</button>
        </div>
        <div class="live-count" aria-live="polite"><span data-player-count>—</span><span class="signal" aria-hidden="true"><i></i><i></i><i></i><i></i></span></div>
        <p data-count-label>Players online</p>
        <div class="live-bottom"><span data-status-time>Connecting to Nihilium…</span></div>
        <details class="status-details">
          <summary>About this count</summary>
          <p>Server status is checked every minute. The status provider may cache results for up to five minutes. ${icon('external')} <a href="https://mcsrvstat.us/server/nihilium.org" target="_blank" rel="noopener noreferrer">View status source</a></p>
        </details>
      </aside>
    </div>
  </section>

  <section class="connection-section page-width" id="join" aria-labelledby="join-heading">
    <div class="connection-bar glass">
      <div class="connection-heading"><h2 id="join-heading">Join Nihilium</h2></div>
      <div class="connection-option">
        <div class="edition-label">${icon('monitor')} Java Edition <span class="edition-tag" data-java-version>PC · MAC · LINUX</span></div>
        <button class="address-button" data-copy="nihilium.org" aria-label="Copy Java address nihilium.org"><span>nihilium.org</span>${icon('copy')}</button>
        <span class="edition-help">Multiplayer → Add Server</span>
      </div>
      <div class="connection-option bedrock-option">
        <div class="edition-label">${icon('controller')} Bedrock Edition <span class="edition-tag">CROSSPLAY</span></div>
        <button class="address-button" data-copy="bedrock.nihilium.org" aria-label="Copy Bedrock address bedrock.nihilium.org"><span>bedrock.nihilium.org</span>${icon('copy')}</button>
        <div class="edition-help">Port <button class="port-copy" data-copy="25406" aria-label="Copy Bedrock port 25406">25406 ${icon('copy')}</button><span>·</span> Mobile & Windows</div>
      </div>
    </div>
  </section>

  <section class="world-section page-width" aria-labelledby="world-heading">
    <div class="section-heading"><div><h2 id="world-heading">About the server</h2></div></div>
    <div class="feature-grid">
      <article class="feature-card glass">
        <div class="feature-icon">${icon('compass')}</div>
        <h3>Anarchy survival</h3>
        <p>Build, explore, form alliances, or play solo.</p>
      </article>
      <article class="feature-card glass">
        <div class="feature-icon">${icon('history')}</div>
        <h3>Since January 2025</h3>
        <p>Running since January 2025, with around 800 GB of discoveries, creations, and player history.</p>
        <a class="card-bottom" href="/about.html">About Nihilium ${icon('arrow')}</a>
      </article>
      <article class="feature-card glass">
        <div class="feature-icon">${icon('people')}</div>
        <h3>Java & Bedrock</h3>
        <p>Java and Bedrock players connect to the same world.</p>
        <a class="card-bottom" href="#join">Connection details ${icon('arrow')}</a>
      </article>
    </div>
  </section>

  ${galleryPreview(icon)}

  <section class="faq-section page-width" aria-labelledby="faq-heading">
    <div>
      <h2 id="faq-heading">How to join</h2>
      <a class="text-link" href="https://discord.gg/nihilium" target="_blank" rel="noopener noreferrer">Ask us on Discord ${icon('external')}</a>
    </div>
    <div class="faq-list">
      <details>
        <summary>How do I join on Java Edition?<span>+</span></summary>
        <p>Open Minecraft Java Edition, choose Multiplayer → Add Server, and enter <button class="inline-copy" data-copy="nihilium.org">nihilium.org ${icon('copy')}</button> as the server address. Save it, select Nihilium, and click Join Server. Follow the in-game instructions to register or sign in.</p>
      </details>
      <details>
        <summary>Can I play on Bedrock Edition?<span>+</span></summary>
        <p>Yes. On mobile or Windows, open Play → Servers → Add Server. Use <strong>bedrock.nihilium.org</strong> as the address and <strong>25406</strong> as the port. Console editions may require an additional method to connect to a custom server.</p>
      </details>
      <details>
        <summary>What does anarchy mean here?<span>+</span></summary>
        <p>You choose how to play, and you are responsible for your actions. Deliberately lagging the server, exploiting vulnerabilities, or interfering with its operation can lead to restrictions. Read the <a href="/terms.html">Terms of Service</a> for the details.</p>
      </details>
    </div>
  </section>
</main>`;
