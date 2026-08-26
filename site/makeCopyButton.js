function makeCopyButton(elementID, textToCopy, defaultContent, copiedContent) {
  const btn = document.getElementById(elementID);

  if (!btn) {
    console.error(`Could not find button with ID ${elementID}`);
    return;
  }

  btn.innerHTML = defaultContent;

  btn.addEventListener("click", function () {
    navigator.clipboard.writeText(textToCopy).then(function () {
      btn.innerHTML = copiedContent;

      setTimeout(() => {
        btn.innerHTML = defaultContent;
      }, 2000);
    });
  });
}
