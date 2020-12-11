const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const Roomplacecode = db.define('roomplacecode', {
    situation: {
        type: Sequelize.STRING
    }
},
{
    timestamps: false
})

Roomplacecode.associate = (models) => {
    Roomplacecode.hasOne(models.Roomplayers, {
        onDelete: "cascade"
    })

    Roomplacecode.hasOne(models.Roomassistmaster, {
        onDelete: "cascade"
    })
}

module.exports = Roomplacecode;