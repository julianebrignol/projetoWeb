emailjs.init("public_KiZyDyuKTuBpqGVR5");

const form = document.getElementById("form-contacto");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = form.querySelector('[name="user-name"]').value;
  const email = form.querySelector('[name="user-email"]').value;
  const mensagem = form.querySelector('[name="message"]').value;

  if (nome === "" || email === "" || mensagem === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Email inválido.");
    return;
  }

  emailjs
    .send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
      from_name: nome,
      from_email: email,
      message: mensagem,
    })
    .then(
      function () {
        alert("Mensagem enviada com sucesso!");
        form.reset();
      },
      function (error) {
        alert("Erro ao enviar. Tente novamente.");
        console.error("Erro:", error);
      }
    );
});
