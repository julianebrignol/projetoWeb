var sizeModal = document.getElementById('sizeModal');
sizeModal.addEventListener('show.bs.modal', function (event) {
  var trigger = event.relatedTarget;

  var title       = trigger.getAttribute('data-title');
  var description = trigger.getAttribute('data-description');
  var imageSrc    = trigger.getAttribute('data-image');
  var price       = trigger.getAttribute('data-price');

  this.querySelector('#modal-product-title').textContent       = title;
  this.querySelector('#modal-product-description').textContent = description;
  this.querySelector('#modal-product-price').textContent       = price + ' EUR';

  var imgEl = this.querySelector('#modal-product-image');
  imgEl.src = imageSrc;
  imgEl.alt = title;

  // → Aqui: reseta a quantidade para 1
  this.querySelector('#modal-quantity').value = 1;
});

	// Quando clica no “−”
$(document).on('click', '#qty-decrease', function() {
	const $inp = $('#modal-quantity');
	let val = parseInt($inp.val(), 10);
	if (val > 1) {
	  $inp.val(val - 1);
	}
  });
  
  // Quando clica no “＋”
  $(document).on('click', '#qty-increase', function() {
	const $inp = $('#modal-quantity');
	let val = parseInt($inp.val(), 10);
	$inp.val(val + 1);
  });