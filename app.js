// minha-app-crud/app.js

const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./config/database'); // Importa a conexão com o banco
const Item = require('./models/Item');       // Importa o modelo Item

// Configurações do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurações para servir arquivos estáticos (CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares para processar dados de formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Rotas da Aplicação ---

// Rota principal (Tela Inicial)
app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Curiosidades da Tecnologia'
    });
});

// Rota para a Tela de Dados (CRUD - Leitura)
 app.get('/dados', async (req, res) => {
     try {
         const dadosDoBanco = await Item.findAll();
         res.render('dados', {
             titulo: 'Gerenciamento de Dados',
             dadosDoBanco: dadosDoBanco
         });
     } catch (error) {
         console.error('Erro ao buscar dados:', error);
         res.status(500).send('Erro ao carregar os dados.');
     }
 });

// Rota para o Formulário de Inclusão/Alteração (agora aceita ID para edição)


// Rota para o Formulário de INCLUSÃO (quando não há ID na URL)
app.get('/formulario', async (req, res) => {
    res.render('formulario', {
        titulo: 'Cadastrar Novo Item', // Título para inclusão
        item: null // Para inclusão, não passamos um item
    });
});

// Rota para o Formulário de ALTERAÇÃO (quando há ID na URL)
app.get('/formulario/:id', async (req, res) => {
    let item = null;
    try {
        item = await Item.findByPk(req.params.id); // Busca o item pelo ID
        if (!item) {
            return res.status(404).send('Item não encontrado para edição.');
        }
    } catch (error) {
        console.error('Erro ao buscar item para edição:', error);
        return res.status(500).send('Erro ao carregar item para edição.');
    }
    res.render('formulario', {
        titulo: 'Editar Item', // Título para edição
        item: item // Passa o item encontrado para o template
    });
});

// ... (suas rotas POST virão abaixo) ...

// Rota para SALVAR um novo item (CREATE) ou ATUALIZAR um existente (UPDATE)
 // ... (suas rotas GET que acabamos de definir, /formulario e /formulario/:id) ...

// Rota POST para SALVAR um NOVO item (CREATE)
app.post('/salvar-item', async (req, res) => {
    try {
        const { nome, descricao } = req.body;
        await Item.create({ nome, descricao }); // Cria um novo item
        console.log('Novo item salvo com sucesso!');
        res.redirect('/dados'); // Redireciona para a lista
    } catch (error) {
        console.error('Erro ao salvar o item:', error);
        res.status(500).send('Erro ao salvar o item.');
    }
});

// Rota POST para ATUALIZAR um item EXISTENTE (UPDATE)
app.post('/salvar-item/:id', async (req, res) => {
    try {
        const { nome, descricao } = req.body;
        const itemId = req.params.id; // Pega o ID da URL

        const item = await Item.findByPk(itemId); // Encontra o item
        if (item) {
            await item.update({ nome, descricao }); // Atualiza
            console.log(`Item com ID ${itemId} atualizado com sucesso!`);
        } else {
            return res.status(404).send('Item para atualização não encontrado.');
        }
        res.redirect('/dados'); // Redireciona para a lista
    } catch (error) {
        console.error('Erro ao atualizar o item:', error);
        res.status(500).send('Erro ao atualizar o item.');
    }
});


// Rota para EXCLUIR um item (DELETE)
 app.post('/deletar-item/:id', async (req, res) => {
     try {
         const itemId = req.params.id;

         const linhasDeletadas = await Item.destroy({
             where: { id: itemId }
         });

         if (linhasDeletadas > 0) {
             console.log(`Item com ID ${itemId} excluído com sucesso!`);
         } else {
             console.log(`Item com ID ${itemId} não encontrado para exclusão.`);
         }

         res.redirect('/dados');
     } catch (error) {
         console.error('Erro ao excluir o item:', error);
         res.status(500).send('Erro ao excluir o item.');
     }
});


// --- Início do Servidor ---

// Sincroniza os modelos com o banco de dados
sequelize.sync({ force: false }) // 'force: true' apaga e recria as tabelas a cada inicialização (cuidado!)
    .then(() => {
        console.log('Banco de dados sincronizado.');
        // Inicia o servidor Express APENAS DEPOIS que o banco de dados foi sincronizado
        const PORT = process.env.PORT || 3000; // Move a definição da porta para aqui
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });