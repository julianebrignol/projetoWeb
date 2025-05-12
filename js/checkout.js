(function () {
  // Já injeta o estilo de erro (borda vermelha)
  if (!document.getElementById("checkout-error-style")) {
    const style = document.createElement("style");
    style.id = "checkout-error-style";
    style.textContent = `
      input.error,
      textarea.error,
      select.error {
        border: 2px solid red;
      }
    `;
    document.head.appendChild(style);
  }

  // Função principal de validação
  function initCheckoutValidation(form) {
    const submitButtons = document.querySelectorAll("#btn-finish-order");
    if (!form || submitButtons.length === 0 || form.dataset.validationInit) return;

    form.dataset.validationInit = "true"; // marca como inicializado

    // Habilita/desabilita os botões conforme validade
    function toggleButtons() {
      submitButtons.forEach((btn) => {
        btn.disabled = !form.checkValidity();
      });
    }

    // Ao digitar/alterar, limpa erros e atualiza botões
    form.addEventListener("input", () => {
      form.querySelectorAll(".error").forEach((el) => el.classList.remove("error"));
      toggleButtons();
    });

    // Ao submeter, bloqueia e marca erros se houver
    form.addEventListener("submit", (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        form.querySelectorAll("input, textarea, select").forEach((field) => {
          if (!field.checkValidity()) {
            field.classList.add("error");
          }
        });
      }
    });

    // Estado inicial dos botões
    toggleButtons();
  }

  // MutationObserver para detectar quando o form é adicionado dinamicamente
  const observer = new MutationObserver(() => {
    const form = document.querySelector(".checkout-form form");
    if (form && !form.dataset.validationInit) {
      initCheckoutValidation(form);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Caso o form já exista ao carregar
  if (document.readyState !== "loading") {
    const form = document.querySelector(".checkout-form form");
    if (form) initCheckoutValidation(form);
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.querySelector(".checkout-form form");
      if (form) initCheckoutValidation(form);
    });
  }
})();
