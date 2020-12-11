const Sequelize = require("sequelize");
const db = require('./../../utils/dbConn');

const Role = db.define('role', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    permission: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

Role.associate = models => {
    Role.hasOne(models.Userrole, {
        foreignKey: {
            allowNull: false
    }
});
}

module.exports = Role;