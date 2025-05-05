import { addToCart, renderCart, clearCart } from './cart.js';

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
  loadPage('pages/confirmation.html', initCheckout);

  // Nav buttons
  $('#btn-products').on('click', () => loadPage('pages/product.html', initProducts));
  $('#btn-cart').on('click', () => loadPage('pages/cart.html', initCart));
  $(document).on('click', '#btn-checkout', () => loadPage('pages/checkout.html', initCheckout));

  function initProducts() {
    // Lógica dos produtos aqui, se necessário
  }

  function initCart() {
    renderCart();
  }

  function initCheckout() {
    renderCart();
  
    $(document).off('click', '#btn-continue-shopping').on('click', '#btn-continue-shopping', () => {
      console.log('Botão clicado!');
      clearCart();
  
      // Volta para a página dos produtos
      loadPage('pages/product.html', initProducts);
    });
  }
});
