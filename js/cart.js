// cart.js (ES Module)

const iva = 0.23;
const shippingRate = 3.95;
const fadeTime = 300;

// Estado do carrinho
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

function clearCart() {
  cartItems = [];
  saveCart();
  renderCart(); // Atualiza o interface se necessário
}

function recalculateCart() {
  let subtotal = 0;
  cartItems.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  const ivaValue = subtotal * iva;
  const shipping = subtotal > 0 ? shippingRate : 0;
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
}

function addToCart(item) {
  const existing = cartItems.find(p => p.id === item.id && p.size === item.size);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cartItems.push(item);
  }
  saveCart();
  renderCart();
}

function removeFromCart(id, size) {
  cartItems = cartItems.filter(item => !(item.id === id && item.size === size));
  saveCart();
  renderCart();
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

// Eventos existentes
$(document).on('show.bs.modal', '#sizeModal', function(event) {
  const triggerBtn = $(event.relatedTarget);
  const modal = $(this);

  const productData = {
    id: triggerBtn.data('id'),
    title: triggerBtn.data('title'),
    description: triggerBtn.data('description'),
    price: parseFloat(triggerBtn.data('price')),
    image: triggerBtn.data('image')
  };

  modal.find('#modal-product-title').text(productData.title);
  modal.data('product', productData);
});

$(document).on('click', '.add-to-cart-btn', function() {
  const modal = $(this).closest('.modal');
  const product = modal.data('product');
  const size = modal.find('input[name="sizeOptions"]:checked').val();

  const newItem = {
    ...product,
    quantity: 1,
    size
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

window.addEventListener('load', () => {
  renderCart();
});

// Exportações finais
export { addToCart, renderCart, clearCart };
