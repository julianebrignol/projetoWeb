// Declarar mainElement para armazenar o elemento <main>
let mainElement;

// Carregar a página inicial quando o documento estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  mainElement = document.getElementById("main");

  loadContent();
});

async function loadContent() {
  fetch(`/pages/home.html`)
    .then((response) => response.text())
    .then((content) => {
      mainElement.innerHTML = content;
    });
}