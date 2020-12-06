const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

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
    userPosts : {
        type: Sequelize.INTEGER,
        allownull: true
    },
    bio: {
        type: Sequelize.STRING,
        allowNull: true
    },
    level: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Userdata.associate = (models) => {
    Userdata.belongsTo(models.user, {foreignKey: 'id', as: 'users'})
}

module.exports = Userdata;