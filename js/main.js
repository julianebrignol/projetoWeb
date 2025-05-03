document.addEventListener("DOMContentLoaded", function () {
	const mainContent = document.getElementById("main");
  
	fetch("pages/cart.html")
	  .then((response) => response.text())
	  .then((data) => {
		mainContent.innerHTML = data;
  
		// Espera pelo DOM dinâmico antes de associar eventos
		setTimeout(initCart, 100);
	  });
  });