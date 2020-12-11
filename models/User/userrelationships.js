const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

const User = require('./user');
const Userrelationshipsstatus = require('./userrelationshipstatus');

const Userrelationships = db.define('userrelationships', {
    idRelationship: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
})

Userrelationships.belongsTo(User, {
    foreignKey: {
        name: "idUserOne",
        allowNull: false   
    }
})

Userrelationships.belongsTo(User, {
    foreignKey: {
        name: "idUserTwo",
        allowNull: false   
    }
})

Userrelationships.belongsTo(Userrelationshipsstatus, {
    foreignKey: {
        name: "statusCode",
        allowNull: false   
    }
})

module.exports = Userrelationships;