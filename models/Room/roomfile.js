const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const Room = require('./room');

const Roomfile = db.define('roomfile', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    timestamps: false
})

Roomfile.belongsTo(Room, {
    foreignKey: {
        allowNull: false
    }
})

module.exports = Roomfile;