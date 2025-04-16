document.getElementById("nome").addEventListener("input", function () {
  chrome.storage.sync.set({ textoPadrao: this.value + " " }); // adiciona espaço após o nome
});