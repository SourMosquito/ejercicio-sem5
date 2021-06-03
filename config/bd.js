const Sequelize = require('sequelize');

module.exports = new Sequelize('cruds', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
});