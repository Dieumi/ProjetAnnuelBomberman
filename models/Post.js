var sequelize = require("./sequelize");

module.exports = sequelize.import("post", function(sequelize, Datatypes) {
	return sequelize.define("Post", {
        idPost : {
            type : Datatypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
		titlePost : {
			type : Datatypes.STRING
		},
		textPost : {
			type : Datatypes.STRING
		},
		authorPost : {
			type : Datatypes.STRING
		}
	}, {
		paranoid : true,
		freezeTab : true,
		tableName : "post"
	});
});
