const Sequelize = require("sequelize");

const sequelize = new Sequelize('celke', 'luciano', '123456',{
    host: 'localhost',
    port: '3307',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};