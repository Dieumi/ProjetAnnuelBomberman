var sequelize = require("./sequelize");

module.exports = sequelize.import("match", function(sequelize, Datatypes) {
	return sequelize.define("Match", {
		idMatch : {
			type : Datatypes.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
		resultMatch : {
			type : Datatypes.STRING
		},
		dateMatch : {
			type : Datatypes.DATE
		},
		idMapMatch : {
			type : Datatypes.INTEGER
		},
		idTournamentMatch : {
			type : Datatypes.STRING
		}
	}, {
		paranoid : true,
		freezeTab : true,
		tableName : "match"
	});
});