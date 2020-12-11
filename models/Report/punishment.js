const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const Action = require('./action');

const Punishment = db.define('punishment', {
    execution: {
        type: Sequelize.STRING,
        allowNull: true
    },
    datePunishBegin: {
        type: Sequelize.DATE,
        allowNull: true
    }, 
    dateReturn: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
    timestamps: false
})

Punishment.belongsTo(Action, {
    foreignKey: {
        allowNull: false
    }
})

module.exports = Punishment