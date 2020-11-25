const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const Room = db.define('room', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    },
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }, 
    roomName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Room.associate = (models) => {
    Room.belongsTo(models.user, {foreignKey: 'id', as: 'roomid'})
}


module.exports = Room;