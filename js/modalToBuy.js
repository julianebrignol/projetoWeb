  
//Script para preencher título e descrição

	document.querySelectorAll('.openSizeModal').forEach(btn => {
	  btn.addEventListener('click', () => {
		const title       = btn.getAttribute('data-title');
		const description = btn.getAttribute('data-description');
		// Preenche os elementos do modal
		document.getElementById('modal-product-title').textContent       = title;
		document.getElementById('modal-product-description').textContent = description;
	  });
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