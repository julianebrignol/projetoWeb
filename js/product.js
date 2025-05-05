// product.js

$(function(){
	// Abre o modal quando clicares no botão #openSizeModal
	$('#openSizeModal').on('click', function() {
	  const modalEl = document.getElementById('sizeModal');
	  const modal = new bootstrap.Modal(modalEl);
	  modal.show();
	});
  });
  