// main.js (ES Module)

import { addToCart, renderCart } from './cart.js';

$(document).ready(function () {
  const mainContent = $('#main');

  // Fade-out, load html fragment, fade-in
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

  // Initial load: products page
  loadPage('pages/product.html', initProducts);

  // Nav buttons
  $('#btn-products').on('click', () => loadPage('pages/product.html', initProducts));
  $('#btn-cart').on('click',     () => loadPage('pages/cart.html',     initCart));

  function initProducts() {
    // nothing more to bind here: 
    // product.html should put all data-* on the “Escolher Tamanho” button,
    // and cart.js will handle show.bs.modal + add-to-cart-btn inside the modal.
  }

  function initCart() {
    renderCart();
  }
});
