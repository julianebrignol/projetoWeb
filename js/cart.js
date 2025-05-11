// -----------------------------
// CONFIGURAÇÕES INICIAIS
// -----------------------------
const iva = 0.23;
const shippingRate = 3.95;
const fadeTime = 300;

// Estado atual do carrinho (carregado do localStorage)
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// -----------------------------
// FUNÇÕES DE UTILIDADE
// -----------------------------

// Guarda o carrinho no localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Atualiza o número de itens no ícone do carrinho
function updateCartCount() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  $('#header-cart span').text(totalItems);
}

// Limpa o carrinho e atualiza o ecrã
function clearCart() {
  cartItems = [];
  saveCart();
  renderCart();
  updateCartCount();
}

// Calcula subtotal, IVA, envio e total
function recalculateCart() {
  let subtotal = 0;
  cartItems.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  const ivaValue = subtotal * iva;
  const shipping = subtotal >= 50 ? 0 : (subtotal > 0 ? shippingRate : 0);
  const total = subtotal + shipping;

  $('.totals-value').fadeOut(fadeTime, function () {
    $('#cart-subtotal').text(subtotal.toFixed(2));
    $('#cart-ivaValue').text(ivaValue.toFixed(2));
    $('#cart-shipping').text(shipping.toFixed(2));
    $('#cart-total').text(total.toFixed(2));

    if (total === 0) {
      $('.checkout').fadeOut(fadeTime);
    } else {
      $('.checkout').fadeIn(fadeTime);
    }

    $('.totals-value').fadeIn(fadeTime);
  });
}

// -----------------------------
// RENDERIZAÇÃO DO CARRINHO
// -----------------------------
function renderCart() {
  const container = $('.cart-products');
  container.empty();

  cartItems.forEach(item => {
	const productRow = $(`
	  <div class="product" data-id="${item.id}">
		<div class="product-image">
		  <img src="${item.image}">
		</div>
		<div class="product-details">
		  <div class="product-title">${item.title}</div>
		  <p class="product-description">
			${item.description}${item.size ? ' - Tamanho: ' + item.size : ''}
		  </p>
		  <!-- nova linha com o SKU -->
		  <p class="product-sku text-muted small">
			${item.id}
		  </p>
		  <div class="product-actions">
			<div class="quantity-selector">
			  <button class="qty-btn decrease">-</button>
			  <span class="qty-value">${item.quantity}</span>
			  <button class="qty-btn increase">+</button>
			</div>
		  </div>
		</div>
		<div class="product-price" style="display:none;">${item.price.toFixed(2)}</div>
		<div class="product-line-price"></div>
		<button class="remove-product" title="Remover produto">
		  <img src="/images/imagensTeste/delete.png" alt="Remover" class="remove-icon">
		</button>
	  </div>
	`);
	container.append(productRow);
  });

  container.find('.product').each(function () {
    const row = $(this);
    const price = parseFloat(row.find('.product-price').text());
    const quantity = parseInt(row.find('.qty-value').text());
    const linePrice = price * quantity;
    row.find('.product-line-price').text(linePrice.toFixed(2));
  });

  recalculateCart();
  updateCartCount();
}

// -----------------------------
// AÇÕES NO CARRINHO
// -----------------------------
function addToCart(item) {
  const existing = cartItems.find(p => p.id === item.id && p.size === item.size);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cartItems.push(item);
  }
  saveCart();
  renderCart();
  updateCartCount();
}

function removeFromCart(id, size) {
  cartItems = cartItems.filter(item => !(item.id === id && item.size === size));
  saveCart();
  renderCart();
  updateCartCount();
}

function updateLineTotal(productRow, quantity) {
  const price = parseFloat(productRow.find('.product-price').text());
  const linePrice = price * quantity;
  const lineElem = productRow.find('.product-line-price');
  lineElem.fadeOut(fadeTime, function () {
    $(this).text(linePrice.toFixed(2)).fadeIn(fadeTime);
    recalculateCart();
  });
}

// -----------------------------
// EVENTOS DOM E MODAL
// -----------------------------
$(document).on('show.bs.modal', '#sizeModal', function(event) {
	const triggerBtn = $(event.relatedTarget);
	const modal      = $(this);
  
	// Monta o objeto produto
	const productData = {
	  id:          triggerBtn.data('id'),
	  title:       triggerBtn.data('title'),
	  description: triggerBtn.data('description'),
	  price:       parseFloat(triggerBtn.data('price')),
	  image:       triggerBtn.data('image')
	};
  
	// Guarda-o no próprio modal
	modal.data('product', productData);
  
	// Preenche todos os campos
	modal.find('#modal-product-title').text(productData.title);
	modal.find('#modal-product-description').text(productData.description);
	modal.find('#modal-product-price').text(productData.price.toFixed(2) + ' EUR');
	modal.find('#modal-product-image')
		 .attr('src', productData.image)
		 .attr('alt', productData.title);
  
	// Reseta a quantidade para 1
	modal.find('#modal-quantity').val(1);
  });

$(document).on('click', '.add-to-cart-btn', function() {
	const modal    = $(this).closest('.modal');
	const product  = modal.data('product');
	const size     = modal.find('input[name="sizeOptions"]:checked').val();
	// lê a quantidade do input
	const quantity = parseInt(modal.find('#modal-quantity').val(), 10) || 1;
  
	const newItem = {
	  ...product,
	  size,
	  quantity      // usa aqui a quantidade selecionada
	};
  
	addToCart(newItem);
	modal.modal('hide');
  });

  $(document).on('click', '.qty-btn', function () {
	const btn = $(this);
	const row = btn.closest('.product');
	const id = row.data('id');
	const desc = row.find('.product-description').text();
	const size = desc.includes('Tamanho:') ? desc.split('Tamanho:')[1].trim() : '';
	const item = cartItems.find(p => p.id === id && p.size === size);
	if (!item) return;
  
	if (btn.hasClass('increase')) item.quantity++;
	else if (item.quantity > 1) item.quantity--;
  
	saveCart();
	row.find('.qty-value').text(item.quantity);
	updateLineTotal(row, item.quantity);
  
	// ← Atualiza o contador no ícone do carrinho
	updateCartCount();
  });

$(document).on('click', '.remove-product', function () {
  const row = $(this).closest('.product');
  const id = row.data('id');
  const desc = row.find('.product-description').text();
  const size = desc.includes('Tamanho:') ? desc.split('Tamanho:')[1].trim() : '';

  row.slideUp(fadeTime, function () {
    removeFromCart(id, size);
  });
});

// -----------------------------
// LOAD INICIAL
// -----------------------------
window.addEventListener('load', () => {
  renderCart();
  updateCartCount();
});

// -----------------------------
// UTILITÁRIO
// -----------------------------
function isCartEmpty() {
  return cartItems.length === 0;
}

function showEmptyCartModal() {
	$('#modal-empty-cart').fadeIn(150);
  }
  
  function hideEmptyCartModal() {
	$('#modal-empty-cart').fadeOut(150);
  }
  
  $(document).on('click', '#btn-checkout', () => {
	if (isCartEmpty()) {
	  showEmptyCartModal();
	  return;
	}
	loadPage('pages/checkout.html', initCheckout);
  });
  
  // fecha ao clicar no botão ou no backdrop
  $(document).on('click', '#modal-close-btn, .custom-modal__backdrop', () => {
	hideEmptyCartModal();
  });
  
// -----------------------------
// EXPORTAÇÃO (ES MODULE)
// -----------------------------
export { addToCart, renderCart, clearCart, isCartEmpty };
