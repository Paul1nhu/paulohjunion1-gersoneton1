# [Atividade PWEB]

## Descrição
Este é um projeto de aplicação web FullStack desenvolvido como parte da disciplina de [Programacao-WEB] na [IFAL]. O objetivo principal foi criar uma aplicação web utilizando Express, EJS e Sequelize, com acesso a um banco de dados relacional.

A aplicação contempla as seguintes funcionalidades:
- **Tela Inicial:** Uma página de conteúdo estático apresentando curiosidades sobre [Tópico, ex: a história do mascote do Android].
- **Tela de Dados (CRUD):** Uma página para visualização e manutenção (Criação, Leitura, Atualização e Exclusão) de itens.
- **Formulário para Inclusão/Alteração:** Um formulário reutilizável para adicionar novos itens ou editar os existentes.
- **Navegação:** Menu de navegação para as principais seções da aplicação.

## Tecnologias Utilizadas
- **Node.js:** Ambiente de execução JavaScript.
- **Express.js:** Framework web para Node.js, utilizado para construção da API e rotas.
- **EJS (Embedded JavaScript):** Engine de template para renderização de views HTML dinâmicas.
- **Sequelize:** ORM (Object-Relational Mapper) para Node.js, utilizado para interagir com o banco de dados.
- **SQLite:** Banco de dados relacional leve e baseado em arquivo, utilizado para persistência dos dados.
- **HTML5:** Estrutura das páginas web.
- **CSS3:** Estilização da aplicação.

## Estrutura do Projeto
minha-app-crud/
├── config/             # Configurações da aplicação (ex: conexão com o banco de dados)
│   └── database.js
├── models/             # Definição dos modelos do Sequelize (tabelas do banco de dados)
│   └── Item.js
├── public/             # Arquivos estáticos (CSS, imagens, JavaScript do frontend)
│   ├── css/
│   │   └── style.css
│   └── imagens/
│       └── ... (suas imagens e fontes)
├── views/              # Templates EJS
│   ├── layouts/        # Partials reutilizáveis (cabeçalho, rodapé)
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── dados.ejs       # Tela de listagem e CRUD
│   ├── formulario.ejs  # Formulário de inclusão/alteração
│   └── index.ejs       # Tela inicial
├── app.js              # Arquivo principal do servidor Express
├── package.json        # Gerenciamento de dependências
└── package-lock.json

## Como Executar o Projeto Localmente

Para rodar esta aplicação em sua máquina, siga os passos abaixo:

### Pré-requisitos
Certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em seu sistema.

### Instalação e Execução

1.  **Clone o repositório:**
    Abra seu terminal (Git Bash, PowerShell, CMD, etc.) e clone o repositório para sua máquina local:
    ```bash
    git clone [https://github.com/] (https://github.com/Paul1nhu/paulohjunion1-gersoneton1.git)
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd paulohjunion1-gersoneton1
    ```
3.  **Instale as dependências:**
    Instale todas as bibliotecas necessárias para o projeto.
    ```bash
    npm install
    ```

4.  **Inicie o servidor:**
    Execute o arquivo principal da aplicação.
    ```bash
    node app.js
    ```
    Você verá uma mensagem no terminal indicando que o servidor está rodando, algo como:
    `Banco de dados sincronizado.`
    `Servidor rodando em http://localhost:3000`

5.  **Acesse a aplicação:**
    Abra seu navegador de internet e acesse:
    ```
    http://localhost:3000
    ```
    A partir daí, você poderá navegar para a tela de "Gerenciamento de Dados" ou "Formulário" para interagir com o CRUD.

---
Desenvolvido por: [Paulo H. Junio e Gerson A. da Silva Neto]