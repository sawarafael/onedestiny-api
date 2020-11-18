const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

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
})

Article.associate = (models) => {
    Article.belongsTo(models.user, {foreignKey: 'ID', as: 'articleid'});
    Article.belongsTo(models.tags, {foreignKey: 'ID', as: 'tagsid'});
}

module.exports = Article;