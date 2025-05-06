const form = document.getElementById("form-contacto");

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = form.querySelector('[name="user_name"]').value;
    const email = form.querySelector('[name="user_email"]').value;
    const mensagem = form.querySelector('[name="message"]').value;

    if (nome === "" || email === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        alert("Email inválido.");
        return;
    }
    alert("Mensagem registada com sucesso!");
    form.reset();
});