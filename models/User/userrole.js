const Sequelize = require('sequelize');
const db = require('../../utils/dbConn');

const User = require('./../User/user');
const Role = require('./../User/role');

const Userrole = db.define('userrole', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: false
})

Userrole.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
});

Userrole.belongsTo(Role, {
    foreignKey: {
        allowNull: false
    }
});

module.exports = Userrole;