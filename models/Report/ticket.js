const Sequelize = require('sequelize');
const User = require('../User/user');
const db = require('./../../utils/dbConn');

const Ticket = db.define('ticket', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    report: {
        type: Sequelize.STRING,
        allowNull: false
    },
    proofs: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    timestamps: false
})

Ticket.belongsTo(User, {
    foreignKey: {
        name: "userClaimantId",
        allowNull: false
    }
 })

 Ticket.belongsTo(User, {
     foreignKey: {
         name: "userAclaimedId",
         allowNull: false
     }
 })

Ticket.associate = models => {    

    Ticket.hasOne(models.Coordenator, {
        onDelete: "cascade"
    })
}

module.exports = Ticket;