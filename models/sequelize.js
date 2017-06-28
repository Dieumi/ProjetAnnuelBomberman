var Sequelize=require("sequelize");
var config    = require('config');  // we use node-config to handle environments
require('../env.js');


if(process.env.NODE_ENV=="test"){
	var dbConfig =	config.get("test");
} else if(process.env.NODE_ENV=="development") {
	var dbConfig =	config.get('development');
} else if(process.env.NODE_ENV=="production"){
	var dbConfig =	config.get('production');
}
module.exports = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
	{
		host: dbConfig.host,
		dialect: dbConfig.dialect
	}
)
