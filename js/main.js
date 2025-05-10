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
  loadPage('pages/home.html', initCheckout);

  // -----------------------------
  // EVENTOS DE NAVEGAÇÃO (Botões de topo/menu)
  // -----------------------------
  $('#header-cart').on('click', () => loadPage('pages/cart.html', initCart));
  $(document).on('click', '#btn-contacts', () => loadPage('pages/contact.html', initContacts));
  $(document).on('click', '#category-women', () => loadPage('pages/women.html', initContacts));
  $(document).on('click', '#category-men', () => loadPage('pages/men.html', initContacts));
  $(document).on('click', '#category-kids', () => loadPage('pages/kids.html', initContacts));
  $(document).on('click', '#header-logo', () => loadPage('pages/home.html', initContacts));


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

  function initContacts() {
    console.log('Página de contatos carregada.');
  
    // Inicializa o MicroModal (só funciona após o HTML estar no DOM)
    MicroModal.init();
  
    // Garante que o evento é sempre limpo e reatribuído
    $(document).off('submit', '#form-contacto').on('submit', '#form-contacto', function (e) {
      e.preventDefault();
  
      const form = this;
      const nome = form.querySelector('[name="user_name"]').value.trim();
      const email = form.querySelector('[name="user_email"]').value.trim();
      const mensagem = form.querySelector('[name="message"]').value.trim();
  
      if (!nome || !email || !mensagem) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
  
      if (!email.includes("@") || !email.includes(".")) {
        alert("Email inválido.");
        return;
      }
  
      form.reset();
  
      console.log('Modal existe?', document.getElementById('modal-1'));
      // Mostra o modal
      MicroModal.show('modal-1');
  
      // (Opcional) Fecha automaticamente após 5 segundos
      // setTimeout(() => MicroModal.close('modal-1'), 5000);
    });
  }

  function initCart() {
    renderCart(); // Garante que os produtos estão visíveis ao carregar o carrinho
  }

  function initCheckout() {
    renderCart();
  
    // Botão "Continuar a comprar" — APENAS navega de volta para a home
    $(document).off('click', '#btn-continue-shopping').on('click', '#btn-continue-shopping', () => {
      loadPage('pages/home.html', initProducts);
    });
  
    // Botão "Voltar ao Carrinho"
    $(document).off('click', '#btn-cart').on('click', '#btn-cart', () => {
      loadPage('pages/cart.html', initCart);
    });
  
    // Botão "Finalizar Pedido" — LIMPA o carrinho e vai para confirmação
    $(document).off('click', '#btn-finish-order').on('click', '#btn-finish-order', (e) => {
      e.preventDefault(); // Evita envio real do formulário, se for necessário
      clearCart();
      loadPage('pages/confirmation.html', initCheckout);
    });
  }
});
