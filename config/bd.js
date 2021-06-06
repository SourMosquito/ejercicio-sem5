const Sequelize = require('sequelize');

module.exports = new Sequelize('cruds', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});