# Análise Técnica — Projeto E-commerce Rhae

Este documento apresenta uma análise técnica das decisões e abordagens possíveis para o desenvolvimento do projeto de loja e-commerce, considerando as capacidades da equipa, as ferramentas utilizadas (HTML, CSS, Bootstrap, JavaScript) e os objetivos do projeto.

---

## 1. Abordagens de Navegação entre Páginas

### O que é uma Multi-página

Uma arquitetura onde cada página do site é um ficheiro HTML distinto (ex: `index.html`, `women.html`, `cart.html`, etc.). Ao navegar, o browser recarrega completamente o conteúdo da nova página.

### O que é uma SPA Simulada (Single Page Application)

Simula o comportamento de uma aplicação de página única, onde apenas um ficheiro HTML principal (`index.html`) é carregado e o conteúdo da `<main>` muda dinamicamente via JavaScript, sem recarregar a página inteira.

---

### Comparação entre abordagens:

| Critério                        | Multi-página                 | SPA Simulada                                   |
| ------------------------------- | ---------------------------- | ---------------------------------------------- |
| Simplicidade de implementação   | Alta (ideal para iniciantes) | Média/Alta (exige JS para navegação)           |
| Colaboração em equipa           | Fácil (páginas divididas)    | Necessário atenção às alterações ao index.html |
| Manter conteúdo variaveis em JS | Requer `localStorage`        | Permite usar variáveis em memória              |
| Duplicação de código            | Sim (header/footer copiados) | Não (estrutura centralizada)                   |
| Performance                     | Recarrega tudo a cada clique | Mais leve (sem reload total)                   |

---

## 2. Lógica de Estado com JavaScript

### O que é “Memória JavaScript”

Refere-se às variáveis que existem enquanto o site está aberto na mesma página. Ex: `let cart = []`.  
❗ Estas variáveis **são perdidas** sempre que se muda de página ou se recarrega o browser.

### O que é `localStorage`

Um armazenamento permanente no browser que guarda dados como texto (strings), mesmo após fechar ou mudar de página. Exemplo:

```js
localStorage.setItem("cart", JSON.stringify(cart));
let cart = JSON.parse(localStorage.getItem("cart")) || [];
```

### Comparação:

| Aspeto             | Memória JS  | localStorage                 |
| ------------------ | ----------- | ---------------------------- |
| Dura entre páginas | ❌ Não      | ✅ Sim                       |
| Dura após fechar   | ❌ Não      | ✅ Sim                       |
| Tipo de dados      | Variável JS | Apenas strings (usando JSON) |
| Complexidade       | Baixa       | Média (requer serialização)  |

---

## 3. Estrutura de Pastas

A organização do projeto segue a seguinte estrutura:

```
/ecommerce-zara-clone
├── index.html
├── /pages
│   ├── home.html
│   ├── women.html
│   ├── men.html
│   ├── kids.html
│   ├── cart.html
│   ├── checkout.html
│   ├── confirmation.html
│   └── contact.html
├── /css
│   ├── index.css
│   ├── home.css
│   ├── women.css
│   ├── men.css
│   ├── kids.css
│   ├── cart.css
│   ├── checkout.css
│   ├── confirmation.css
│   └── contact.css
├── /js
│   ├── main.js
│   ├── cart.js
│   ├── checkout.js
│   └── ...
├── /images
├── /assets
├── /documentation
│   ├── tech_analysis.md
│   └── features.md
├── README.md
```

### Justificações:

- `/pages`: contém os blocos ou páginas completas de conteúdo, permitindo separar a lógica visual de cada secção do site.
- `/css`: contém os estilos separados por secção/página para facilitar a divisão de tarefas e evitar conflitos.
- `/js`: dividido por função — `main.js` para interações globais (navbar, modais), `cart.js` para lógica do carrinho, `checkout.js` para a lógica do checkout.
- `/images`: armazena todas as imagens.
- `/assets`: se necessário para guardar icons, fontes, etc.
- `/documentation`: para se adicionar documentação como planeamento, questões técnicas, etc.

---

## 4. Responsividade e Mobile-First

- O projeto segue o princípio **Mobile-First**, ou seja, é desenhado inicialmente para ecrãs pequenos e adaptado progressivamente para tamanhos maiores.
- A estrutura e disposição dos elementos devem adaptar-se fluidamente a diferentes dispositivos (telemóveis, tablets, desktop).
- A implementação da responsividade pode ser feita com **qualquer técnica adequada**, como:
  - Flexbox
  - CSS Grid
  - Utilização de media queries
  - Classes utilitárias do Bootstrap
- Elementos como a navbar, secções de produtos, formulários e modais devem ser testados em diferentes larguras de ecrã para garantir uma boa experiência de utilização.
