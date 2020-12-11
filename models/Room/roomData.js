const Sequelize = require('sequelize');
const db = require('./../../utils/dbConn');

const Room = require('./room');

const Tag = require('./../tags');
const User = require('../User/user');

const Roomdata = db.define('roomdata', {
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
},{
    timestamps: false
})

Roomdata.belongsTo(Room, {
    foreignKey: {
        allowNull: false
    }
});

Roomdata.belongsTo(Tag, {
    foreignKey: {
        allowNull: false
    }
});

Roomdata.belongsTo(User, {
    foreignKey: {
        allowNull: false
    }
})

Roomdata.associate = models => {
    Roomdata.hasOne(models.Roomdatawikia, {
        onDelete: "cascade"
    })

    Roomdata.hasOne(models.Roomplayers, {
        onDelete: "cascade"
    })

    Roomdata.hasOne(models.Roomassistmasters, {
        onDelete: "cascade"
    })
}


module.exports = Roomdata;
