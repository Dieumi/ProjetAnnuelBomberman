var Sequelize = require("Sequelize");

module.exports = new Sequelize("bomberman", "root", "", {
	pool : false,
	host : "localhost",
	port : 3306
});