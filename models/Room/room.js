const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const User = require('./../User/user');

const Room = db.define('room', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
    }, 
    roomName: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    timestamps: false
})

Room.belongsTo(User, {
    foreigKey: {
        allowNull: false
    }
})

Room.associate = models => {   
    Room.hasOne(models.RoomData, {
        onDelete: "cascade"
    })

    Room.hasMany(models.Roomrecords, {
        onDelete: "cascade"
    })
}

module.exports = Room;