var sequelize = require("./sequelize");
var User = require("./User");

sequelize.sync();

module.exports = {
	"sequelize" : sequelize,
	"User" : User
};