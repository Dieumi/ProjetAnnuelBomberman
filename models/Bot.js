var sequelize = require("./sequelize");

module.exports = sequelize.import("bot", function(sequelize, Datatypes) {
	return sequelize.define("Bot", {
		idBot : {
			type : Datatypes.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
		nameBot : {
			type : Datatypes.STRING
		},
		codeBot : {
			type : Datatypes.STRING
		},
		winBot : {
			type : Datatypes.INTEGER
		},
		loseBot : {
			type : Datatypes.INTEGER
		},
		pointBot : {
			type : Datatypes.INTEGER
		},
		modeBot : {
			type : Datatypes.STRING
		},
		userIdBot : {
			type : Datatypes.INTEGER
		}
	}, {
		paranoid : true,
		freezeTab : true,
		tableName : "bot"
	});
});