var sequelize = require("./sequelize");

module.exports = sequelize.import("gameApiDesc", function(sequelize, Datatypes) {
    return sequelize.define("GameApiDesc", {
        idGameApiDesc: {
			type : Datatypes.INTEGER,
			primaryKey : true,
			autoIncrement : true
		},
        nameGameApiDesc: {
			type : Datatypes.STRING
		},
        descriptionGameApiDesc: {
			type : Datatypes.STRING
        },
        typeGameApiDesc: {
            type: Datatypes.STRING
        },
        paramGameApiDesc: {
            type: Datatypes.STRING
        },
        returnGameApiDesc: {
            type: Datatypes.STRING
        },
	}, {
		paranoid : true,
		freezeTab : true,
		tableName: "GameApiDesc"
	});
});
