const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const User = require('./user');
const Userpost = require('./userposts');

const Userpostcomments = db.define('userpostcomments', { 
    content: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Userpostcomments.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})

Userpostcomments.belongsTo(Userpost, {
    foreignKey: {
        allowNull: false
    }
})

module.exports = Userpostcomments;