const links = [{ name: "about", link: "about.html" }];

const topbarDiv = document.createElement("div");
topbarDiv.classList.add("topbar");

const homeImg = document.createElement("img");
homeImg.src = "favicon.ico";

const homeLink = document.createElement("a");
homeLink.href = "index.html";
homeLink.appendChild(homeImg);
topbarDiv.appendChild(homeLink);

for (const linkObj of links) {
  const linkElement = document.createElement("a");
  linkElement.href = linkObj.link;
  linkElement.innerText = linkObj.name.toUpperCase();
  topbarDiv.appendChild(linkElement);
}

const main = document.getElementById("main");
if (main) main.prepend(topbarDiv);
else document.body.prepend(topbarDiv);
