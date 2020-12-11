const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

const User = require('./user')

const Userdata = db.define('userdata', {    
    nickname: {
        type: Sequelize.STRING,
        allowNull: true
    }, 
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    },
    coverPage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    bio: {
        type: Sequelize.STRING,
        allowNull: true
    },
    level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    timestamps: false
})

Userdata.belongsTo(User, {
    foreingKey: {
        allowNull: false
    }
})

module.exports = Userdata;