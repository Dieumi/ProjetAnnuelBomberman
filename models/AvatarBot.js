var sequelize = require("./sequelize");

module.exports = sequelize.import("avatarBot", function (sequelize, Datatypes) {
    return sequelize.define("AvatarBot", {
        idAvatarBot: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameAvatarBot: {
            type: Datatypes.STRING
        },
    }, {
        paranoid: true,
        freezeTab: true,
        tableName: "avatarbot"
    });
});
