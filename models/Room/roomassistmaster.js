const Sequelize = require('sequelize');
const User = require('../User/user');
const db = require('./../../utils/dbConn');
const Roomdata = require('./roomData');
const Roomplacecode = require('./roomplacecode');

const RoomAssistentMaster = db.define('roomassistenmaster', {

},
{
    timestamps: false
})

RoomAssistentMaster.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})

RoomAssistentMaster.belongsTo(Roomdata, {
    foreignKey: {
        allowNull: false
    }
})

RoomAssistentMaster.belongsTo(Roomplacecode, {
    foreignKey: {
        allowNull: false
    }
})

module.exports = RoomAssistentMaster;
