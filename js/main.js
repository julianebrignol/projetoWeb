const form = document.getElementById("form-contacto");

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = form.querySelector('[name="user-name"]').value;
    const email = form.querySelector('[name="user-email"]').value;
    const mensagem = form.querySelector('[name="message"]').value;

    if (nome === "" || email === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        alert("Email inválido.");
        return;
    }
    // Enviar email com EmailJS
    emailjs.sendForm('service_vlyrazd', 'template_7850ewq', form)
        .then(function () {
            alert("Mensagem enviada com sucesso!");
            form.reset();
        }, function (erro) {
            console.log("Erro:", erro);
            alert("Erro ao enviar a mensagem.");
        });
});