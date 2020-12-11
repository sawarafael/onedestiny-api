const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const User = require('./../User/user');
const Ticket = require('./ticket');

const Coordenator = db.define('coordenator', {
    idCoord: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: false
})

Coordenator.belongsTo(User, {
    foreignKey: {
        allowNull: true
    }
})

Coordenator.belongsTo(Ticket, {
    foreignKey: {
        allowNull: true
    }
});

module.exports = Coordenator;