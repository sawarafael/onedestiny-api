const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

const Userfavorite = db.define('userfavorite', {
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