var sequelize = require("./sequelize");

module.exports = sequelize.import("map", function(sequelize, Datatypes) {
	return sequelize.define("Map", {
		idMap : {
			type : Datatypes.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
		nameMap : {
			type : Datatypes.STRING
		}
	}, {
		paranoid : true,
		freezeTab : true,
		tableName : "map"
	});
});