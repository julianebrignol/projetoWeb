const iva = 0.23;
const shippingRate = 3.95;
const fadeTime = 300;

function recalculateCart() {
  let subtotal = 0;

  $('.product').each(function () {
    const lineText = $(this).find('.product-line-price').text();
    const linePrice = parseFloat(lineText);
    if (!isNaN(linePrice)) {
      subtotal += linePrice;
    }
  });

  const ivaValue = subtotal * iva;
  const shipping = subtotal > 0 ? shippingRate : 0;
  const total = subtotal + ivaValue + shipping;

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

function updateLineTotal(productRow, quantity, instant = false) {
	const price = parseFloat(productRow.find('.product-price').text());
	const linePrice = price * quantity;
  
	const lineElem = productRow.find('.product-line-price');
  
	if (instant) {
	  lineElem.text(linePrice.toFixed(2));
	  recalculateCart();
	} else {
	  lineElem.fadeOut(fadeTime, function () {
		$(this).text(linePrice.toFixed(2));
		recalculateCart();
		$(this).fadeIn(fadeTime);
	  });
	}
  }

  function inicializarCarrinho() {
	$('.product').each(function () {
	  const qty = parseInt($(this).find('.qty-value').text());
	  updateLineTotal($(this), qty, true); // ← passa 'true' para preenchimento instantâneo
	});
  }

$(document).on('click', '.qty-btn', function () {
  const button = $(this);
  const productRow = button.closest('.product');
  const qtySpan = productRow.find('.qty-value');
  let quantity = parseInt(qtySpan.text());

  if (button.hasClass('increase')) {
    quantity += 1;
  } else if (button.hasClass('decrease') && quantity > 1) {
    quantity -= 1;
  }

  qtySpan.text(quantity);
  updateLineTotal(productRow, quantity);
});

$(document).on('click', '.remove-product', function () {
  const productRow = $(this).closest('.product');
  productRow.slideUp(fadeTime, function () {
    productRow.remove();
    recalculateCart();
  });
});

window.addEventListener('load', () => {
	inicializarCarrinho();
  });
