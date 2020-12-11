const Sequelize = require('sequelize');
const db        = require('./../../utils/dbConn');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    }, 
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


User.associate = models => {
    User.hasOne(models.Userrole, {
        onDelete: "cascade"
    })

    User.hasOne(models.userdata, {
        onDelete: "cascade",
        onUpdate: "cascade"
    })

    User.hasMany(models.Userrelationships, {
        onDelete: "cascade"
    })

    User.hasMany(models.Userposts, {
        onDelete: "cascade"
    })

    User.hasMany(models.Userfavorites, {
        onDelete: "cascade"
    })

    User.hasOne(models.Coordenator, {
        onDelete: "cascade"
    })

    User.hasMany(models.Room, {
        onDelete: "cascade"
    })

    User.hasMany(models.Roomdata, {
        onDelete: "cascade"
    })

    User.hasMany(models.roomrecord, {
        onDelete: "cascade"
    })

    User.hasOne(models.usermedals, {
        onDelete: "cascade"
    })

    User.hasMany(Ticket, {
        onDelete: "cascade",
        onUpdate: "cascade"
    })
} 

module.exports = User;