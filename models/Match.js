var sequelize = require("./sequelize");

module.exports = sequelize.import("match", function(sequelize, Datatypes) {
	return sequelize.define("Match", {
		idMatch : {
			type : Datatypes.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
		matchNull : {
			type : Datatypes.BOOLEAN
		},
		idWinner : {
			type : Datatypes.INTEGER
		},
		idLoose : {
			type : Datatypes.INTEGER
		},
		dateMatch : {
			type : Datatypes.DATE
		}
	}, {
		paranoid : true,
		freezeTab : true,
		tableName : "matchBot"
	});
});
