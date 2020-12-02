const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');
const User = require('./user');

const Userfavorite = db.define('userfavorite', {
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    favoriteTags: {
        type: Sequelize.STRING,
        allowNull: true
    },
    favoriteRooms: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

Userfavorite.associate = (models) => {
    Userfavorite.belongTo(models.tags, {foreignKey: 'ID', as: 'userfavoriteIDt'});
    Userfavorite.belongTo(models.room, {foreignKey: 'ID', as: 'userfavoriteIDr'})
}

module.exports = Userfavorite;