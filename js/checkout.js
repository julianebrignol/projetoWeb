(function() {
	// Já injeta o estilo de erro (borda vermelha)
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
  
	// Função principal de validação
	function initCheckoutValidation() {
	  const form = document.querySelector('.checkout-form form');
	  const submitBtn = document.getElementById('btn-finish-order');
	  if (!form || !submitBtn || form.dataset.validationInit) return;
	  form.dataset.validationInit = 'true'; // evita múltiplos listeners
  
	  // Habilita/desabilita o botão conforme validade
	  function toggleButton() {
		submitBtn.disabled = !form.checkValidity();
	  }
  
	  // Ao digitar/alterar, limpa erros e atualiza botão
	  form.addEventListener('input', () => {
		form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
		toggleButton();
	  });
  
	  // Ao enviar, impede e sinaliza campos inválidos
	  form.addEventListener('submit', e => {
		if (!form.checkValidity()) {
		  e.preventDefault();
		  form.querySelectorAll('input, textarea, select').forEach(field => {
			if (!field.checkValidity()) field.classList.add('error');
		  });
		}
	  });
  
	  // Estado inicial do botão
	  toggleButton();
	}
  
	// Polling: tenta inicializar até encontrar o form
	const interval = setInterval(() => {
	  if (document.querySelector('.checkout-form form')) {
		initCheckoutValidation();
		clearInterval(interval);
	  }
	}, 100);
  })();
  