const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

const User = require('./../User/user');
const Tag = require('./../tags');

const Article = db.define('article', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    timestamps: true
})

Article.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})

Article.belongsTo(Tag, {
    foreignKey: {
        allowNull: false
    }
})

module.exports = Article;