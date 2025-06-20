// minha-app-crud/models/Item.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa a conexão com o banco de dados

// Define o modelo 'Item'
const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false, // O campo 'nome' não pode ser nulo
    },
    descricao: {
        type: DataTypes.TEXT, // Usamos TEXT para descrições mais longas
        allowNull: true,    // O campo 'descricao' pode ser nulo
    },
}, {
    tableName: 'items', // Nome da tabela no banco de dados (boa prática ser plural)
    timestamps: true,   // Adiciona automaticamente os campos createdAt e updatedAt
});

module.exports = Item; // Exporta o modelo Item