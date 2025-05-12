(function() {
	// Injeta CSS de erro se ainda não existir
	if (!document.getElementById('checkout-error-style')) {
	  const style = document.createElement('style');
	  style.id = 'checkout-error-style';
	  style.textContent = `
		input.error,
		textarea.error,
		select.error { border: 2px solid red; }
	  `;
	  document.head.appendChild(style);
	}
  
	function initCheckoutValidation() {
	  const form = document.querySelector('.checkout-form form');
	  const submitBtn = document.getElementById('btn-finish-order');
	  if (!form || !submitBtn) return;
  
	  // Se ainda não inicializamos, anexamos os listeners
	  if (!form.dataset.validationInit) {
		form.dataset.validationInit = 'true';
  
		function toggleButton() {
		  submitBtn.disabled = !form.checkValidity();
		}
  
		form.addEventListener('input', () => {
		  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
		  toggleButton();
		});
  
		form.addEventListener('submit', e => {
		  if (!form.checkValidity()) {
			e.preventDefault();
			form.querySelectorAll('input, textarea, select').forEach(field => {
			  if (!field.checkValidity()) field.classList.add('error');
			});
		  }
		});
  
		toggleButton();
	  }
	}
  
	// Função para “resetar” tudo após um checkout bem-sucedido
	function resetCheckoutForm() {
	  const form = document.querySelector('.checkout-form form');
	  const submitBtn = document.getElementById('btn-finish-order');
	  if (!form || !submitBtn) return;
  
	  // limpa valores e validações
	  form.reset();
	  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
	  // garante que o botão fique ativo (ou conforme lógica inicial)
	  submitBtn.disabled = false;
	  // permite reinicializar os listeners se o form for reusado
	  delete form.dataset.validationInit;
  
	  // re-inicializa imediatamente
	  initCheckoutValidation();
	}
  
	// Polling para inicializar logo que o form aparece
	const interval = setInterval(() => {
	  if (document.querySelector('.checkout-form form')) {
		initCheckoutValidation();
		clearInterval(interval);
	  }
	}, 100);
  
	// — Exemplo de hook: imaginando que seu fluxo de checkout
	// emita um evento “checkout:success” no document.
	document.addEventListener('checkout:success', () => {
	  resetCheckoutForm();
	});
  
  })();
  