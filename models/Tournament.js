var sequelize = require("./sequelize");

module.exports = sequelize.import("tournament", function(sequelize, Datatypes) {
	return sequelize.define("Tournament", {
		idTournament : {
			type : Datatypes.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
		nameTournament : {
			type : Datatypes.STRING
		},
		nbPlayerTournament : {
			type : Datatypes.STRING
		},
		pointMiniTournament : {
			type : Datatypes.STRING
		},
		createdByTournament : {
			type : Datatypes.STRING
		}
	}, {
		paranoid : true,
		freezeTab : true,
		tableName : "tournament"
	});
});