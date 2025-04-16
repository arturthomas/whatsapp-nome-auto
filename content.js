const limparTexto = (texto) => texto.replace(/\*/g, "").trim();

const preencherMensagem = (textoPadrao) => {
  const editor = document.querySelector('[contenteditable="true"][data-tab="10"]');
  if (!editor) return;

  const textoAtual = limparTexto(editor.innerText);
  const nomeLimpo = limparTexto(textoPadrao);

  if (!textoAtual.startsWith(nomeLimpo)) {
    editor.focus();
    document.execCommand("insertText", false, textoPadrao);
  }
};

let debounceTimer = null;

chrome.storage.sync.get("textoPadrao", (data) => {
  const textoPadrao = data.textoPadrao || "";
  if (!textoPadrao) return;

  const targetNode = document.querySelector("#app");
  if (!targetNode) return;

  const observer = new MutationObserver(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => preencherMensagem(textoPadrao), 300);
  });

  observer.observe(targetNode, { childList: true, subtree: true });
});