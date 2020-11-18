const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');
const User = require('./user');

const Userdata = db.define('userdata', {
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
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