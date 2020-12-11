const Sequelize = require('sequelize');
const db = require('../utils/dbConn');

const Medals = db.define('medals', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    img: {
        type: Sequelize.STRING
    }
},{
    timestamps: null
})

Medals.associate = models => {
    Medals.hasOne(models.Usermedals, {
        onDelete: "cascade"
    })
}

module.exports = Medals;