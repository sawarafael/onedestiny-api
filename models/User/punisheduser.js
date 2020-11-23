const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

const PunishedUser = db.define('punisheduser', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    idUser: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    case: {
        type: Sequelize.STRING,
        allowNull: true
    }, 
    action: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateReturn: {
        type: Sequelize.DATE,
        allowNull: true
    }
})

PunishedUser.associate = (models) => {
    PunishedUser.belongsTo(models.user, {foreignKey: 'ID', as: 'punishedid' });
}

module.exports = PunishedUser;