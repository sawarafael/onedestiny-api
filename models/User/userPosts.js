const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

const User = require('./user');

const Userposts = db.define('userpost', {    
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Userposts.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})

Userposts.associate = models => {
    Userposts.hasMany(models.Userpostcomments, {
        onDelete: "cascade"
    })
}

module.exports = Userposts;