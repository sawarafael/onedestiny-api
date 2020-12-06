const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

const UserPosts = db.define('userpost', {
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false
    },    
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

UserPosts.associate = (models) => {
    UserPosts.belongsTo(models.user, {foreignKey: 'id', as: 'users'})
}

module.exports = UserPosts;