import { icon } from './layout.mjs';

export const terms = [
  [
    'Acceptance of Terms',
    '<p>By registering on the nihilium Minecraft server ("server"), you agree to these Terms of Service. If you do not agree, please do not register.</p>',
  ],
  [
    'Description',
    '<p>The service is provided "as is" and "as available".</p>',
  ],
  [
    'User Responsibilities',
    '<p>You are responsible for your actions on the server.</p>',
  ],
  [
    'Prohibited activities',
    '<p>These actions may result in limitations being implemented on the server that affect one specific player or the entire server.</p><ul><li>Building contraptions to deliberately lag the server or use large amounts of server resources.</li><li>Exploiting vulnerabilities or interfering with the server’s operation.</li></ul>',
  ],
  [
    'Data and privacy',
    '<p>The server may collect and store data as described in our <a href="/privacy.html">privacy policy</a></p>',
  ],
  [
    'Termination',
    '<p>We reserve the right to terminate or restrict access to the nihilium Minecraft or Discord server.</p>',
  ],
  [
    'Changes to this policy',
    '<p>We may update this Privacy Policy. It is up to the player to check when it gets updated. This website is <a href="https://github.com/NihiliumMC/website/" target="_blank" rel="noopener noreferrer">open source on github</a> where the edit history is present.</p><p>For questions or concerns, contact us via the information present on the <a href="/about.html">about page</a>.</p>',
  ],
];

export const privacy = [
  [
    'Acceptance of Terms',
    '<p>By registering on the nihilium Minecraft server, you agree to the terms of this Privacy Policy. If you do not agree, please do not register.</p><p>By visiting this website, you agree to analytics-related terms of this privacy policy.</p>',
  ],
  [
    'Data we collect',
    '<p>We only collect data that is essential for Nihilium</p><ul><li>Player username</li><li>Player password</li><li>Player UUID</li><li>Player settings</li><li>Player homes</li></ul><p>However, the software we use also stores data we do not need or use such as</p><ul><li>Player IP</li><li>Player messages</li></ul><p>This website uses umami.is to collect analytics data. See (1) WHAT INFORMATION DO WE COLLECT? in <a href="https://umami.is/privacy" target="_blank" rel="noopener noreferrer">their privacy policy</a></p>',
  ],
  [
    'Data usage',
    '<h3>Providing service</h3><p>We use the data we collect to provide features such as homes, configurable mace damage or a configurable player list that require us to store the above mentioned data.</p><h3>Promoting our service</h3><p>We use analytics data collected through our analytics platform to bring more players to the server.</p>',
  ],
  [
    'Data storage and security',
    '<h3>Providing service</h3><p>We store the data we collect securely. We will make sure unauthorized third parties do not have access to this data. For information about the security of data collected on this website see the <a href="https://umami.is/privacy" target="_blank" rel="noopener noreferrer">umami privacy policy</a></p>',
  ],
  [
    'Data sharing',
    '<p>We do not sell or share your personal data with third parties.</p>',
  ],
  [
    'Changes to this policy',
    '<p>We may update this Privacy Policy. It is up to the player to check when it gets updated. This website is <a href="https://github.com/NihiliumMC/website/" target="_blank" rel="noopener noreferrer">open source on github</a> where the edit history is present and you can get notified when there are changes.</p><p>For questions or concerns, contact us via the information present on the <a href="/about.html">about page</a>.</p>',
  ],
];

const otherPolicyLink = (title) => {
  const otherTitle = title === 'Privacy Policy' ? 'Terms of Service' : 'Privacy Policy';
  const otherFile = title === 'Privacy Policy' ? 'terms' : 'privacy';
  return `<a class="legal-other" href="/${otherFile}.html">${otherTitle} ${icon('arrow')}</a>`;
};

/** Render a Terms or Privacy page from a list of numbered sections. */
export function renderLegalPage(title, sections) {
  const tableOfContents = sections
    .map(([sectionTitle], index) => {
      const number = String(index + 1).padStart(2, '0');
      return `<a href="#section-${index + 1}">${number} <span>${sectionTitle}</span></a>`;
    })
    .join('');

  const sectionContent = sections
    .map(([sectionTitle, body], index) => {
      const number = String(index + 1).padStart(2, '0');
      return `<section id="section-${index + 1}"><span class="legal-number">${number}</span><h2>${sectionTitle}</h2>${body}</section>`;
    })
    .join('');

  return `<main class="inner-main legal-main page-width">
    <a href="/" class="back-link">← Home</a>
    <div class="inner-title"><h1>${title}</h1></div>
    <div class="legal-layout">
      <nav class="legal-toc glass" aria-label="On this page">
        <span class="section-kicker">ON THIS PAGE</span>
        ${tableOfContents}
        ${otherPolicyLink(title)}
      </nav>
      <article class="legal-body glass">${sectionContent}</article>
    </div>
  </main>`;
}
