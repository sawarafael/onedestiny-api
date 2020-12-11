const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const Roomdata = require('./room');

const Roomdatawikia = db.define('roomdatawikia', {
    content: {
        type: Sequelize.STRING,
        allowNull: true
    },
    images: {
        type: Sequelize.STRING,
        allowNull: true
    },
    toRecord: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{
    timestamps: false
})

Roomdatawikia.belongsTo(Roomdata, {
    foreignKey: {
        allowNull: false
    }
})

module.exports = Roomdatawikia;