const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const Action = db.define('action', {
    idAction: {        
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    severity: {
        type: Sequelize.STRING,
        allowNull: true
    },
    action: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false
})

Action.associate = models => {
    Action.hasOne(models.Punishment, {
        onDelete: "cascade"
    })
}

module.exports = Action;