// minha-app-crud/config/database.js

const { Sequelize } = require('sequelize');
const path = require('path');

// Configura a conexão com o banco de dados SQLite
// O banco de dados será um arquivo chamado 'database.sqlite' na pasta raiz do projeto
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite'), // Caminho para o arquivo do banco de dados
    logging: false, // Define para 'true' para ver os comandos SQL no console (útil para depurar)
});

module.exports = sequelize; // Exporta a instância do Sequelize