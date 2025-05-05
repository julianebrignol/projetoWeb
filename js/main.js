// -----------------------------
// IMPORTAÇÕES DE FUNÇÕES DO CARRINHO
// -----------------------------
import { addToCart, renderCart, clearCart, isCartEmpty } from './cart.js';

// -----------------------------
// INICIALIZAÇÃO DO DOCUMENTO
// -----------------------------
$(document).ready(function () {
  const mainContent = $('#main'); // Elemento principal onde o conteúdo das páginas será carregado

  // -----------------------------
  // FUNÇÃO PARA CARREGAR PÁGINAS DINAMICAMENTE COM ANIMAÇÃO
  // -----------------------------
  function loadPage(url, callback) {
    mainContent.fadeOut(200, function () {
      mainContent.load(url, function (response, status) {
        mainContent.fadeIn(200);
        if (status === 'error') {
          console.error(`Erro ao carregar ${url}: ${response}`);
        }
        if (callback) callback(); // Executa função extra após carregamento (ex: initCart)
      });
    });
  }

  // -----------------------------
  // CARREGAMENTO INICIAL (Página de Confirmação como default)
  // -----------------------------
  loadPage('pages/confirmation.html', initCheckout);

  // -----------------------------
  // EVENTOS DE NAVEGAÇÃO (Botões de topo/menu)
  // -----------------------------
  $('#btn-products').on('click', () => loadPage('pages/product.html', initProducts));
  $('#btn-cart').on('click', () => loadPage('pages/cart.html', initCart));

  // Botão para finalizar compra
  $(document).on('click', '#btn-checkout', () => {
    if (isCartEmpty()) {
      alert('O carrinho está vazio. Adicione produtos antes de finalizar a compra.');
      return;
    }
    loadPage('pages/checkout.html', initCheckout);
  });

  // -----------------------------
  // FUNÇÕES DE INICIALIZAÇÃO PARA CADA PÁGINA
  // -----------------------------
  function initProducts() {
    // Aqui podes carregar produtos via AJAX ou aplicar eventos
  }

  function initCart() {
    renderCart(); // Garante que os produtos estão visíveis ao carregar o carrinho
  }

  function initCheckout() {
    renderCart(); // Mostra resumo do carrinho na sidebar da finalização

    // Botão para continuar a comprar (limpa o carrinho e vai para produtos)
    $(document).off('click', '#btn-continue-shopping').on('click', '#btn-continue-shopping', () => {
      clearCart();
      loadPage('pages/product.html', initProducts);
    });

    // Botão para voltar ao carrinho
    $(document).off('click', '#btn-cart').on('click', '#btn-cart', () => {
      loadPage('pages/cart.html', initCart);
    });
  }
});
