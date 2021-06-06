const Sequelize = require ('sequelize');
const db = require('../config/bd');
const Direccion = require('./direccion');

const Customers = db.define('Customers', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING(35),
        allowNull: false,
    },
    apellidos: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    RFC: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(35),
        allowNull: false,
    },
    telefono: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN(),
        allowNull: false,
    },

});

Customers.belongsTo(Direccion, { onDelete: 'CASCADE' });

module.exports = Customers;
