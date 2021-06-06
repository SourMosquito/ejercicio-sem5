const Sequelize = require ('sequelize');
const db = require('../config/bd');
const Municipio = require('../models/municipio');


const Localidad = db.define('Localidad', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
});

Localidad.belongsTo(Municipio, { onDelete: 'CASCADE' });
Municipio.hasMany(Localidad, { onDelete: 'CASCADE' });

module.exports = Localidad;
