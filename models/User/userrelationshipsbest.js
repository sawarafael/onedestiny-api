const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

const User = require('./user');
const Userrelationshipsstatus = require('./userrelationshipstatus');

const Userrelationshipsbest = db.define('userrelationshipsbest', {
    idBestRelationship: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
},{
    timestamps: false
})

Userrelationshipsbest.belongsTo(User, {
    foreignKey: {
        name: "idUserOne",
        allowNull: false
    }
})

Userrelationshipsbest.belongsTo(User, {
    foreignKey: {
        name: "idUserTwo",
        allowNull: false
    }
})


Userrelationshipsbest.belongsTo(Userrelationshipsstatus, {
    foreignKey: {
        name: "statusCode",
        allowNull: false   
    }
})

module.exports = Userrelationshipsbest;