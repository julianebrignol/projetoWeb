// document.getElementById('content-container').innerHTML = `
//   ... // aqui vai o teu HTML do formulário + modais
// `;

// // Só depois de injetar, inicializa:
// MicroModal.init();

// // Agora podes adicionar os listeners de submissão:
// addContactFormListener(); // função que definimos abaixo

// function addContactFormListener() {
// 	const form = document.getElementById("form-contacto");
// 	if (!form) return;
  
// 	form.addEventListener("submit", function (e) {
// 	  e.preventDefault();
  
// 	  const nome = form.querySelector('[name="user_name"]').value.trim();
// 	  const email = form.querySelector('[name="user_email"]').value.trim();
// 	  const mensagem = form.querySelector('[name="message"]').value.trim();
  
// 	  if (!nome || !email || !mensagem) {
// 		alert("Por favor, preencha todos os campos.");
// 		return;
// 	  }
  
// 	  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
// 		alert("Email inválido.");
// 		return;
// 	  }
  
// 	  form.reset();
  
// 	  // Mostrar o modal
// 	  MicroModal.show('modal-1');
// 	});
//   }
  