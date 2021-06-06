const Sequelize = require ('sequelize');
const db = require('../config/bd');
const Localidad = require('../models/localidad');


const Direccion = db.define('Direccion', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    calle: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    numexterior: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    numinterior: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    cp: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

Direccion.belongsTo(Localidad, { onDelete: 'CASCADE' });
Localidad.hasOne(Direccion, { onDelete: 'CASCADE' });

module.exports = Direccion;