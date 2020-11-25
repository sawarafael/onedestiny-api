const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');
const RoomPlugins = require('./roomPlugins');

const RoomPluginData = db.define('roomplugindata', {
    idRoom: {
        type: Sequelize.INTEGER,
        allowNull: false  
    },
    idOwner: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

RoomPluginData.associate = (models) => {
    RoomPluginData.belongsTo(models.roomplugins, {foreignKey: 'id', as: 'roomplugindataid'})
}

module.exports = RoomPluginData;