var sequelize = require("./sequelize");

module.exports = sequelize.import("succes", function(sequelize, Datatypes) {
	return sequelize.define("Succes", {
		idSucces : {
			type : Datatypes.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
		nameSucces : {
			type : Datatypes.STRING
		},
		imgSucces : {
			type : Datatypes.STRING
		}
	}, {
		paranoid : true,
		freezeTab : true,
		tableName : "succes"
	});
});