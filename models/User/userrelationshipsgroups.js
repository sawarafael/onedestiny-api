const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

const User = require('./user');
const Userrelationshipsstatus = require('./userrelationshipstatus');

const Userrelationshipsgroups = db.define('userrelationshipsgroups', {
    idGroupRelationship: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    groupName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
})

Userrelationshipsgroups.belongsTo(User, {
    foreignKey: {
        name: "idUserOwn",
        allowNull: false
    }
})

Userrelationshipsgroups.belongsTo(User, {
    foreignKey: {
        name: "idUserInvited",
        allowNull: false
    }
})


Userrelationshipsgroups.belongsTo(Userrelationshipsstatus, {
    foreignKey: {
        name: "statusCode",
        allowNull: false   
    }
})

module.exports = Userrelationshipsgroups;