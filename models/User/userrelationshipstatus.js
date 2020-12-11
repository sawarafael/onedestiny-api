const Sequelize = require("sequelize");
const db = require("./../../utils/dbConn");

const Userrelationshipsstatus = db.define('userrelationshipsstatus', {
    statusCode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false
})

Userrelationshipsstatus.associate = models => {
    Userrelationshipsstatus.hasOne(models.Userrelationshipsstatus, {
        onDelete: "cascade"
    })
}

module.exports = Userrelationshipsstatus;

