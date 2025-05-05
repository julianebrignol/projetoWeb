import { addToCart, renderCart } from './cart.js';

$(document).ready(function () {
  const mainContent = $('#main');

  function loadPage(url, callback) {
    mainContent.fadeOut(200, function () {
      mainContent.load(url, function (response, status) {
        mainContent.fadeIn(200);
        if (status === 'error') {
          console.error(`Erro ao carregar ${url}: ${response}`);
        }
        if (callback) callback();
      });
    });
  }

  // Initial load
  loadPage('pages/checkout.html', initCheckout);

  // Nav buttons
  $('#btn-products').on('click', () => loadPage('pages/product.html', initProducts));
  $('#btn-cart').on('click',     () => loadPage('pages/cart.html', initCart));
  $('#btn-checkout').on('click', () => loadPage('pages/checkout.html', initCheckout));

  function initProducts() {
    // Lógica dos produtos aqui, se necessário
  }

  function initCart() {
    renderCart();
  }

  function initCheckout() {
    renderCart(); // Atualiza os valores do resumo do pedido
  }
});
