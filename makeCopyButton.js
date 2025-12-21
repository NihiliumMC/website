function makeCopyButton(elementID, textToCopy, defaultText, copiedText) {
  const btn = document.getElementById(elementID);

  if (!btn) {
    console.error(`Could not find button with ID ${elementID}`);
    return;
  }

  btn.textContent = defaultText;

  btn.addEventListener("click", function () {
    navigator.clipboard.writeText(textToCopy).then(function () {
      btn.textContent = copiedText;

      setTimeout(() => {
        btn.textContent = defaultText;
      }, 2000);
    });
  });
}
