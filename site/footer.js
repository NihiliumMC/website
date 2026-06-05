addFooter();

function addFooter() {
  const container = document.createElement("div");
  container.classList.add("footer");

  container.innerHTML += `© ${new Date().getFullYear()} Nihilium — All rights reserved | `;

  const tosLink = document.createElement("a");
  tosLink.href = "tos.html";
  tosLink.innerText = "Terms of Service";

  const privacyLink = document.createElement("a");
  privacyLink.href = "privacy.html";
  privacyLink.innerText = "Privacy Policy";

  container.appendChild(tosLink);
  container.innerHTML += " | ";
  container.appendChild(privacyLink);

  document.body.appendChild(container);
}
