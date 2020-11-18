const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');
const User = require('./user');

const Userfriends = db.define('userfriends', {
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idFriend: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false        
    },
    action: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

Userfriends.associate = (models) => {
    Userfriends.belongsTo(models.user, {foreignKey: 'ID', as: 'userApplicantID'});
    Userfriends.belongsTo(models.user, {foreignKey: 'ID', as: 'userRequiredID'});
}

module.exports = Userfriends;