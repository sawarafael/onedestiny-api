const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

const Room = require('./room');
const User = require('./../User/user');

const Roomrecord = db.define('roomrecord', {
    idRecord: {        
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    }
},{
    timestamps: false
})


Roomrecord.belongsTo(Room, {
    foreignKey: {
        allowNull: false
    }
})

Roomrecord.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})

Roomrecord.associate = (models) => {
   
    Roomrecord.hasOne(models.Roomrecordinfo, {
        onDelete: "cascade"
    })
}

module.exports = Roomrecord;