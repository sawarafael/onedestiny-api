const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const User = require('./user');
const Tag = require('./../tags');

const Userfavorites = db.define('userfavorites', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: false
})

Userfavorites.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})

Userfavorites.belongsTo(Tag, {
    foreignKey: {
        allowNull: true
    }
})

module.exports = Userfavorites;
