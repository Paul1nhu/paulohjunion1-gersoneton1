const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./config/database');
const Item = require('./models/Item');
// Configurações do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas do site

// Rota principal
app.get('/', (req, res) => {
    res.render('index', {
        titulo: 'Curiosidades da Tecnologia'
    });
});

// Rota para a tela de dados
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

// Rota para o Formulário
app.get('/formulario', async (req, res) => {
    res.render('formulario', {
        titulo: 'Cadastrar Novo Item', // Título para inclusão
        item: null // Para inclusão, não passamos um item
    });
});

// Rota para o Formulário para edtar
app.get('/formulario/:id', async (req, res) => {
    let item = null;
    try {
        item = await Item.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send('Item não encontrado para edição.');
        }
    } catch (error) {
        console.error('Erro ao buscar item para edição:', error);
        return res.status(500).send('Erro ao carregar item para edição.');
    }
    res.render('formulario', {
        titulo: 'Editar Item',
        item: item 
    });
});

// Rota SALVAR um NOVO item
app.post('/salvar-item', async (req, res) => {
    try {
        const { nome, descricao } = req.body;
        await Item.create({ nome, descricao });
        console.log('Novo item salvo com sucesso!');
        res.redirect('/dados');
    } catch (error) {
        console.error('Erro ao salvar o item:', error);
        res.status(500).send('Erro ao salvar o item.');
    }
});

// Rota para ATUALIZAR um item que ja existe
app.post('/salvar-item/:id', async (req, res) => {
    try {
        const { nome, descricao } = req.body;
        const itemId = req.params.id; 

        const item = await Item.findByPk(itemId); 
        if (item) {
            await item.update({ nome, descricao }); // aqui ele atualiza o item com os novos dados
            console.log(`Item com ID ${itemId} atualizado com sucesso!`);
        } else {
            return res.status(404).send('Item para atualização não encontrado.');
        }
        res.redirect('/dados'); 
    } catch (error) {
        console.error('Erro ao atualizar o item:', error);
        res.status(500).send('Erro ao atualizar o item.');
    }
});


// Rota para EXCLUIR um item
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

// Sincroniza com os bancos de dados e inicia o servidor
sequelize.sync({ force: false })
    .then(() => {
        console.log('Banco de dados sincronizado.');
        const PORT = process.env.PORT || 3000; 
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });