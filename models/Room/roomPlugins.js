const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const RoomPlugins = db.define('roomplugins', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idRoom: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    idOwner: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: true
    }

})

RoomPlugins.associate = (models) => {
    RoomPlugins.belongsTo(models.user, {foreignKey: 'id', as: 'roompluginuserid'});
    RoomPlugins.belongsTo(models.room, {foreignKey: 'id', as: 'roompluginid'});
}

module.exports = RoomPlugins;