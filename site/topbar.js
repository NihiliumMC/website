const links = [
  { name: "about us", link: "about.html" },
  { name: "gallery", link: "gallery.html" },
];

const topbarDiv = document.createElement("div");
topbarDiv.classList.add("topbar");

const homeImg = document.createElement("img");
homeImg.src = "https://nihiliummc.github.io/website/assets/favicon.ico";

const homeLink = document.createElement("a");
homeLink.href = "index.html";
homeLink.appendChild(homeImg);
topbarDiv.appendChild(homeLink);

for (const linkObj of links) {
  const linkElement = document.createElement("a");

  linkElement.classList.add("smallcaps");
  linkElement.style.fontSize = "x-large";

  linkElement.href = linkObj.link;
  linkElement.innerText = linkObj.name;

  topbarDiv.appendChild(linkElement);
}

const main = document.getElementById("main");
if (main) main.prepend(topbarDiv);
else document.body.prepend(topbarDiv);
