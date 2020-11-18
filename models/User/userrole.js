const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

const Userrole = db.define('userrole', {
    free: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }, 
    premium: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }, 
    adm: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }, 
    mod: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

Userrole.associate = (models) => {
    Userrole.belongsTo(models.user, {foreignKey: 'ID', as: 'userroleId'});
  };

module.exports = Userrole;