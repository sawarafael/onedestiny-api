const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

const Roomrecord = require('./roomrecords');
const User = require('../User/user');

const Roomrecordinfo = db.define('roomrecordinfo', {    
    title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: true
    },
    levelCharacter: {
        type: Sequelize.STRING,
        allowNull: true
    },
    barOne: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    barTwo: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    barThree: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    barFour: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    barFive: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    CharacterPhrase: {
        type: Sequelize.STRING,
        allowNull: true
    }
},{
    timestamps: false
})

Roomrecordinfo.belongsTo(Roomrecord, {
    foreignKey: {
        allowNull: false
    }
})

module.exports = Roomrecordinfo;