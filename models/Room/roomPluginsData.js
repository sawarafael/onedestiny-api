const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const RoomPluginData = db.define('roomplugindata', {
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