/* Nihilium — no dependencies, no hard-coded player counts. */
'use strict';
const $ = (selector) => document.querySelector(selector);
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

let toastTimer;
function notify(message) {
  const toast = $('.toast');
  clearTimeout(toastTimer);
  toast.querySelector('span').textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3000);
}
async function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(value); return true; } catch { /* Try the legacy path. */ }
  }
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('aria-label', 'Server address');
  textarea.style.cssText = 'position:fixed;left:-9999px;top:0;';
  document.body.appendChild(textarea);
  textarea.select();
  let copied = false;
  try { copied = document.execCommand('copy'); } catch { /* Show a manual selection next. */ }
  textarea.remove();
  return copied;
}
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    if (await copyText(value)) {
      notify(`${value} copied to clipboard`);
      button.classList.add('is-copied');
      setTimeout(() => button.classList.remove('is-copied'), 1800);
    } else {
      const dialog = $('.copy-dialog');
      dialog.querySelector('input').value = value;
      dialog.showModal();
      dialog.querySelector('input').select();
    }
  });
});

const menuButton = $('.menu-button');
const mobileNav = $('#mobile-nav');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  mobileNav.hidden = expanded;
});
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  mobileNav.hidden = true;
}
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });

const statusCard = $('.live-card');
if (statusCard) {
  const endpoint = 'https://api.mcsrvstat.us/3/nihilium.org';
  const count = $('[data-player-count]');
  const label = $('[data-status-label]');
  const countLabel = $('[data-count-label]');
  const updated = $('[data-status-time]');
  const refresh = $('[data-refresh]');
  let lastSuccess = null;
  let lastAttempt = 0;
  let inFlight = false;

  async function refreshStatus() {
    if (inFlight) return;
    inFlight = true;
    lastAttempt = Date.now();
    refresh.disabled = true;
    refresh.classList.add('is-refreshing');
    statusCard.setAttribute('aria-busy', 'true');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(endpoint, { signal: controller.signal, credentials: 'omit', referrerPolicy: 'no-referrer' });
      if (!response.ok) throw new Error(`Status provider returned ${response.status}`);
      const data = await response.json();
      if (typeof data.online !== 'boolean') throw new Error('Invalid status response');
      const onlineCount = data.players?.online;
      if (data.online && (!Number.isSafeInteger(onlineCount) || onlineCount < 0)) throw new Error('Missing player count');
      lastSuccess = { online: data.online, count: data.online ? onlineCount : null };
      statusCard.dataset.state = data.online ? 'online' : 'offline';
      label.textContent = data.online ? 'SERVER ONLINE' : 'SERVER OFFLINE';
      count.textContent = data.online ? new Intl.NumberFormat().format(onlineCount) : '—';
      countLabel.textContent = data.online ? (onlineCount === 1 ? 'Player online' : 'Players online') : 'Server currently offline';
      const cacheTime = Number(data.debug?.cachetime);
      const observation = Number.isFinite(cacheTime) && cacheTime > 0 ? new Date(cacheTime * 1000) : new Date();
      updated.textContent = `Updated ${observation.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      updated.title = `Status observed ${observation.toLocaleString()}. Provider may cache for up to 5 minutes.`;
      if (data.online && typeof data.version === 'string' && data.version.trim()) {
        const version = data.version.replace(/§(?:#[0-9A-Fa-f]{6}|.)/g, '').trim().replace(/^1\.7\.2(?=-|$)/, '1.8');
        $('[data-java-version]').textContent = version;
      }
    } catch (error) {
      statusCard.dataset.state = 'unavailable';
      label.textContent = 'STATUS UNAVAILABLE';
      if (lastSuccess?.online) {
        count.textContent = new Intl.NumberFormat().format(lastSuccess.count);
        countLabel.textContent = 'Last known player count';
        updated.textContent = 'Connection lost · retrying every minute';
      } else {
        count.textContent = '—';
        countLabel.textContent = 'Player count unavailable';
        updated.textContent = 'Could not reach the status provider';
      }
      updated.removeAttribute('title');
    } finally {
      clearTimeout(timeout);
      refresh.disabled = false;
      refresh.classList.remove('is-refreshing');
      statusCard.setAttribute('aria-busy', 'false');
      inFlight = false;
    }
  }
  refresh.addEventListener('click', refreshStatus);
  refreshStatus();
  setInterval(() => { if (!document.hidden) refreshStatus(); }, 60000);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && Date.now() - lastAttempt >= 60000) refreshStatus();
  });
}
