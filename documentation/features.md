# Functional Features - Rhae

Este ficheiro descreve todas as funcionalidades implementadas (ou planeadas) para o projeto de loja e-commerce, com as tecnologias necessárias e notas sobre o uso de JavaScript.

---

## 1. Homepage com Slider e Produtos em Destaque

- **Descrição:** Página inicial com slider, produtos em destaque e promoções.
- **Interação:** Navegação no slider e clique nos cards para abrir detalhes.
- **Tecnologias:** HTML, CSS, Bootstrap (Carousel)
- **JavaScript:** Opcional (caso se use Carousel do Bootstrap)

---

## 2. Páginas de Categorias (Women, Men, Kids)

- **Descrição:** Páginas dedicadas à listagem de produtos por categoria.
- **Interação:** Visualização e clique em qualquer card de produto para abrir a Modal.
- **Tecnologias:** HTML, CSS, Bootstrap
- **JavaScript:** Opcional (para abrir a modal com dados do produto)

---

## 3. Cards de Produto com Preço, Nome, Imagem e Promoção

- **Descrição:** Conteudo reutilizável nas páginas com informações básicas do produto.
- **Interação:** Clique em todo o card abre a Modal de Produto.
- **Tecnologias:** HTML, CSS, Bootstrap
- **JavaScript:** Opcional (para associar dados do produto ao clique, pode ser feito com data-attributes que depois serão lidos pelo JavaScript)

---

## 4. Modal de Produto

- **Descrição:** Modal com imagem, descrição, tamanho, quantidade e botão "Adicionar ao Carrinho".
- **Interação:** Seleção de tamanho/quantidade e clique no botão.
- **Tecnologias:** HTML, CSS, Bootstrap
- **JavaScript:** Sim (adicionar produto ao carrinho e atualizar estado)

---

## 5. Carrinho de Compras

- **Descrição:** Página com todos os itens adicionados ao carrinho.
- **Interação:** Alterar quantidades, remover produtos, ver total atualizado.
- **Tecnologias:** HTML, CSS, Bootstrap
- **JavaScript:** Sim (renderização dos itens, cálculos de total, armazenamento em localStorage)

---

## 6. Ícone do Carrinho com Contador

- **Descrição:** Ícone no topo com número de produtos no carrinho.
- **Interação:** Atualização automática conforme alterações no carrinho.
- **Tecnologias:** HTML, CSS
- **JavaScript:** Sim (ler estado do carrinho e atualizar contador)

---

## 7. Página de Checkout

- **Descrição:** Formulário de contacto, morada e pagamento.
- **Interação:** Submissão do formulário após validação dos campos.
- **Tecnologias:** HTML, CSS, Bootstrap
- **JavaScript:** Sim (redirecionamento para página de confirmação)

---

## 8. Página de Confirmação de Encomenda

- **Descrição:** Página final após checkout, confirmando a encomenda.
- **Interação:** Mensagem de sucesso e botão para continuar a comprar.
- **Tecnologias:** HTML, CSS, Bootstrap
- **JavaScript:** Sim (redirecionar após checkout, para a home page)

---

## 9. Sistema de Promoções

- **Descrição:** Preços com desconto com valor original riscado.
- **Interação:** Card clicável como os restantes.
- **Tecnologias:** HTML, CSS
- **JavaScript:** Não necessário

---

## 10. Newsletter

- **Descrição:** Campo de subscrição de e-mail.
- **Interação:** Submissão de e-mail com feedback visual.
- **Tecnologias:** HTML, CSS, Bootstrap
- **JavaScript:** Opcional (mensagem de sucesso)

---

## 11. Navbar com Links de Navegação

- **Descrição:** Menu principal com navegação entre páginas.
- **Interação:** Clicar para navegar.
- **Tecnologias:** HTML, CSS, Bootstrap
- **JavaScript:** Opcional (para destacar a página atual, para carregamento dinâmico de conteúdo)

---

## 12. Footer com Contactos e Redes Sociais

- **Descrição:** Rodapé com informações e links úteis.
- **Interação:** Acesso a redes sociais externas.
- **Tecnologias:** HTML, CSS
- **JavaScript:** Não necessário

---

## 13. Página de Contacto

- **Descrição:** Página com formulário de contacto para que o utilizador envie uma mensagem à loja.
- **Interação:** O utilizador preenche nome, e-mail, telefone (opcional) e mensagem, e clica em “Send message”.
- **Tecnologias:** HTML, CSS, Bootstrap
- **JavaScript:** Opcional (mostrar uma mensagem de confirmação após o envio, pode ser feito com uma modal do bootstrap)
