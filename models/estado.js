const Sequelize = require ('sequelize');
const db = require('../config/bd');

const Estado = db.define('Estado', {
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

module.exports = Estado;