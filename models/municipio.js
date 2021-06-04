const Sequelize = require ('sequelize');
const db = require('../config/bd');
const Estado = require('../models/estado');


const Municipio = db.define('Municipio', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING(35),
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
});

Municipio.belongsTo(Estado, { onDelete: 'CASCADE' });
Estado.hasMany(Municipio, { onDelete: 'CASCADE' });

module.exports = Municipio;
