const Sequelize = require ('sequelize');
const db = require('../config/bd');

const Customers = db.define('Estado', {
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
    Direccion: {
        
    },
    Email: {
        type: Sequelize.STRING(35),
        allowNull: false,
    },
    Telefono: {
        type: Sequelize.STRING(15),
        allowNull: false,
    },
    Status: {
        type: Sequelize.BOOLEAN(),
        allowNull: false,
    },

});


module.exports = Customers;