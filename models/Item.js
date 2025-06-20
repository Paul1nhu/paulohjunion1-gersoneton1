
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 


const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'items',
    timestamps: true,
});

module.exports = Item;