const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');
const RoomPlugins = require('./roomPlugins');

const RoomData = db.define('roomdata', {
    idMesa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idMaster: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    },
    players: {
        type: Sequelize.STRING,
        allowNull: true
    },
    assistMasters: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
})

RoomData.associate = (models) => {
    RoomData.belongsTo(models.room, {foreignKey: 'id', as: 'roomdataid'});
    RoomPlugins.belongsTo(models.user, {foreignKey: 'id', as: 'roomdatauserid'})
}

module.exports = RoomData;
