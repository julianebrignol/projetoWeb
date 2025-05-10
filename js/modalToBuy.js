  
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