// -----------------------------
// SCRIPT PARA ABRIR O MODAL DE TAMANHOS
// -----------------------------
$(function () {
  // Ao clicar no botão com ID #openSizeModal
  $("#openSizeModal").on("click", function () {
    const modalEl = document.getElementById("sizeModal"); // Obtém o elemento do modal
    const modal = new bootstrap.Modal(modalEl); // Cria uma instância do modal Bootstrap
    modal.show(); // Exibe o modal
  });
});
