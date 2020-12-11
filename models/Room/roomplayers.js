const Sequelize = require('sequelize');
const User = require('../User/user');
const db = require('./../../utils/dbConn');
const Roomdata = require('./roomData');
const Roomplacecode = require('./roomplacecode');

const Roomplayers = db.define('roomplayer', {

},
{
    timestamps: false
})

Roomplayers.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})

Roomplayers.belongsTo(Roomdata, {
    foreignKey: {
        allowNull: false
    }
})

Roomplayers.belongsTo(Roomplacecode, {
    foreignKey: {
        allowNull: false
    }
})

module.exports = Roomplayers;
