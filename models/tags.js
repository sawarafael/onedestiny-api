const Sequelize = require('sequelize');
const db = require('./../utils/dbConn');

const Tag = db.define('tags', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
})


module.exports = Tag;