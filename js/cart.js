// -----------------------------
// CONFIGURAÇÕES INICIAIS
// -----------------------------
const iva = 0.23;
const shippingRate = 3.95;
const fadeTime = 300;

// Estado atual do carrinho (carregado do localStorage)
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// -----------------------------
// FUNÇÕES DE UTILIDADE
// -----------------------------

// Guarda o carrinho no localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Atualiza o número de itens no ícone do carrinho
function updateCartCount() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  $("#header-cart span").text(totalItems);
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
  cartItems.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  const ivaValue = subtotal * iva;
  const shipping = subtotal >= 50 ? 0 : subtotal > 0 ? shippingRate : 0;
  const total = subtotal + shipping;

  $(".totals-value").fadeOut(fadeTime, function () {
    $("#cart-subtotal").text(subtotal.toFixed(2));
    $("#cart-ivaValue").text(ivaValue.toFixed(2));
    $("#cart-shipping").text(shipping.toFixed(2));
    $("#cart-total").text(total.toFixed(2));

    if (total === 0) {
      $(".checkout").fadeOut(fadeTime);
    } else {
      $(".checkout").fadeIn(fadeTime);
    }

    $(".totals-value").fadeIn(fadeTime);
  });
}

// -----------------------------
// RENDERIZAÇÃO DO CARRINHO
// -----------------------------
function renderCart() {
  const container = $(".cart-products");
  container.empty();

  cartItems.forEach((item) => {
    const productRow = $(`
	  <div class="product" data-id="${item.id}">
		<div class="product-image">
		  <img src="${item.image}">
		</div>
		<div class="product-details">
		  <div class="product-title">${item.description}</div>
		  <span class="product-description">
			${
        item.size
          ? "tamanho: " + `<span class="product-size">${item.size}</span>`
          : ""
      }
		  </span>
		  <div class="product-actions">
        <div class="input-group">
          <button class="btn btn-outline-dark qty-btn decrease" type="button" id="decreaseQuantity">
            -
          </button>
          <span class="form-control text-center qty-value text-small" id="quantityInput">
            ${item.quantity}
          </span>
          <button class="btn btn-outline-dark qty-btn increase" type="button" id="increaseQuantity">
            +
          </button>
        </div>
		  </div>
		</div>
		<div class="product-price" style="display:none;">${item.price.toFixed(2)}</div>
		<div class="product-line-price"></div>
		<button class="remove-product" title="Remover produto">
		  <img src="/assets/images/cart/delete.png" alt="Remover" class="remove-icon">
		</button>
	  </div>
	`);
    container.append(productRow);
  });

  container.find(".product").each(function () {
    const row = $(this);
    const price = parseFloat(row.find(".product-price").text());
    const quantity = parseInt(row.find(".qty-value").text());
    const linePrice = price * quantity;
    row.find(".product-line-price").text(linePrice.toFixed(2));
  });

  recalculateCart();
  updateCartCount();
}

// -----------------------------
// AÇÕES NO CARRINHO
// -----------------------------
function addToCart(item) {
  const existing = cartItems.find(
    (p) => p.id === item.id && p.size.toLowerCase() === item.size.toLowerCase()
  );
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
  cartItems = cartItems.filter(
    (item) =>
      !(item.id === id && item.size.toLowerCase() === size.toLowerCase())
  );
  saveCart();
  renderCart();
  updateCartCount();
}

function updateLineTotal(productRow, quantity) {
  const price = parseFloat(productRow.find(".product-price").text());
  const linePrice = price * quantity;
  const lineElem = productRow.find(".product-line-price");
  lineElem.fadeOut(fadeTime, function () {
    $(this).text(linePrice.toFixed(2)).fadeIn(fadeTime);
    recalculateCart();
  });
}

// -----------------------------
// EVENTOS DOM E MODAL
// -----------------------------
$(document).on("click", ".qty-btn", function () {
  const btn = $(this);
  const row = btn.closest(".product");
  const id = row.data("id");
  const size = row.find(".product-size").text() || "";
  const item = cartItems.find(
    (p) => p.id === id && p.size.toLowerCase() === size.toLowerCase()
  );
  if (!item) return;

  if (btn.hasClass("increase")) item.quantity++;
  else if (item.quantity > 1) item.quantity--;

  saveCart();
  row.find(".qty-value").text(item.quantity);
  updateLineTotal(row, item.quantity);

  // ← Atualiza o contador no ícone do carrinho
  updateCartCount();
});

$(document).on("click", ".remove-product", function () {
  const row = $(this).closest(".product");
  const id = row.data("id");
  const size = row.find(".product-size").text() || "";

  row.slideUp(fadeTime, function () {
    removeFromCart(id, size);
  });
});

// -----------------------------
// LOAD INICIAL
// -----------------------------
window.addEventListener("load", () => {
  renderCart();
  updateCartCount();
});

// -----------------------------
// UTILITÁRIO
// -----------------------------
function isCartEmpty() {
  return cartItems.length === 0;
}

// -----------------------------
// EXPORTAÇÃO (ES MODULE)
// -----------------------------
export { addToCart, renderCart, clearCart, isCartEmpty };
