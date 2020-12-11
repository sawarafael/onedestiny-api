const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const User = require('./user');
const Medal = require('./../Medals');

const Usermedals = db.define('usermedal', {
},
{
    timestamps: false
})

Usermedals.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})

Usermedals.belongsTo(Medal, {
    foreignKey:{
        allowNull: false
    }
})

module.exports = Usermedals;