const Sequelize = require('sequelize');
const db        = require('./../../utils/dbConn');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    }, 
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User;