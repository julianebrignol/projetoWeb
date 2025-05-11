// main.js
import { addToCart, renderCart, clearCart, isCartEmpty } from './cart.js';

$(document).ready(function() {
  const mainContent = $('#main');

  // Função para carregar páginas com animação
  function loadPage(url, callback) {
    mainContent.fadeOut(200, function() {
      mainContent.load(url, function(response, status) {
        mainContent.fadeIn(200);
        if (status === 'error') {
          console.error(`Erro ao carregar ${url}: ${response}`);
        }
        if (callback) callback();
      });
    });
  }

  function loadPageWithFetch(url, callback) {
    const mainElement = document.getElementById("main");

    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        mainElement.innerHTML = html;
        if (callback) callback();
      })
      .catch((error) => {
        console.error(`Error loading ${url}:`, error);
      });
  }

  function loadPageWithFetch(url, callback) {
    const mainElement = document.getElementById("main");

    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        mainElement.innerHTML = html;
        if (callback) callback();
      })
      .catch((error) => {
        console.error(`Error loading ${url}:`, error);
      });
  }

  // -----------------------------
  // CARREGAMENTO INICIAL (Página de Confirmação como default)
  // -----------------------------
  function initHome() {
    handleProductModal();
    initCheckout();
  }

  loadPageWithFetch("pages/home.html", initHome);

  // Eventos de navegação
  $('#header-cart').on('click', () => loadPage('pages/cart.html', initCart));
  $(document).on('click', '#btn-contacts', () => loadPage('pages/contact.html', initContacts));
  $(document).on('click', '#category-women', () => loadPage('pages/women.html', initProducts));
  $(document).on('click', '#category-men', () => loadPage('pages/men.html', initProducts));
  $(document).on('click', '#category-kids', () => loadPage('pages/kids.html', initProducts));
  $(document).on('click', '#header-logo', () => loadPage('pages/home.html', initProducts));

  // Inicializadores de página
  function initProducts() {
    // Carregue produtos via AJAX ou configure eventos específicos
  }

  function initContacts() {
    console.log('Página de contactos carregada.');
    MicroModal.init();

    $(document)
      .off('submit', '#form-contacto')
      .on('submit', '#form-contacto', function(e) {
        e.preventDefault();
        const form = this;
        const nome = form.querySelector('[name="user_name"]').value.trim();
        const email = form.querySelector('[name="user_email"]').value.trim();
        const mensagem = form.querySelector('[name="message"]').value.trim();

        if (!nome || !email || !mensagem) {
          return;
        }
        if (!email.includes("@") || !email.includes(".")) {
			showEmptyEmailModal();
			return;
        }

        form.reset();
        console.log('Modal existe?', document.getElementById('modal-1'));
        MicroModal.show('modal-1');
      });
  }

  function initCart() {
    renderCart();

    // Botão "Finalizar Compra"
    $(document)
      .off('click', '#btn-checkout')
      .on('click', '#btn-checkout', () => {
        if (isCartEmpty()) {
          $('#modal-empty-cart').addClass('show');
          return;
        }
        loadPage('pages/checkout.html', initCheckout);
      });

    // Fechar Modal de Carrinho Vazio
    $(document)
      .off('click', '#modal-close-btn, .custom-modal__backdrop')
      .on('click', '#modal-close-btn, .custom-modal__backdrop', () => {
        $('#modal-empty-cart').removeClass('show');
      });
  }

  function initCheckout() {
    renderCart();

    // Continuar comprando
    $(document)
      .off('click', '#btn-continue-shopping')
      .on('click', '#btn-continue-shopping', () => {
        loadPage('pages/home.html', initProducts);
      });

    // Voltar ao carrinho
    $(document)
      .off('click', '#btn-cart')
      .on('click', '#btn-cart', () => {
        loadPage('pages/cart.html', initCart);
      });

    // Finalizar pedido
    $(document)
      .off('click', '#btn-finish-order')
      .on('click', '#btn-finish-order', (e) => {
        e.preventDefault();
        clearCart();
        loadPage('pages/confirmation.html', initCheckout);
      });
  }
});

// funções de modal (reaproveitando classe .show)
function showEmptyEmailModal() {
	$('#modal-empty-email').addClass('show');
  }
  function hideEmptyEmailModal() {
	$('#modal-empty-email').removeClass('show');
  }
  

  function showSucessSubModal() {
	$('#modal-success-sub').addClass('show');
  }
  function hideSucessSubModal() {
	$('#modal-success-sub').removeClass('show');
	$('.email-input').val('');
  }
  
  // Handler do Subscrever
  $(document).on('click', '#btn-subscribe', () => {
	const email = $('.email-input').val().trim();
  
	// Se não houver "@", mostra o modal de email inválido
	if (!email.includes("@") || !email.includes(".")) {	  
	  $('#modal-empty-email').addClass('show');
	  return;
	}
	else{
	  // Se o email for válido, esconde o modal de email vazio
	  hideEmptyEmailModal();
	  // Mostra o modal de sucesso
	  showSucessSubModal();
	  return;
	}

	// Aqui segues com a lógica de subscrição normal...
	console.log('Subscrever:', email);
  });
  
  // Fecha o modal de email vazio
  $(document).on('click', '#modal-email-close, .custom-modal__backdrop', () => {
	hideEmptyEmailModal();
  });

  // Fecha o modal de sucesso
  $(document).on('click', '#modal-success-close, .custom-modal__backdrop', () => {
	hideSucessSubModal();
  });
