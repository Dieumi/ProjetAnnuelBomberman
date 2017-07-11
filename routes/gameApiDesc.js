module.exports = function(app, models,utils) {

	app.get("/gameApiDesc", function (req, res, next) {
	    var GameApiDesc = models.GameApiDesc;
	    GameApiDesc.findAll().then(function (results) {
			res.send(results);
		}).catch(function (err) {
			res.json({
				"code": 2,
				"message": "Sequelize error",
				"error": err
			})
		})
	});

	app.post("/gameApiDesc", function (req, res, next) {

	    if (req.body.nameGameApiDesc
				&& req.body.descriptionGameApiDesc && req.body.typeGameApiDesc) {
	        var GameApiDesc = models.GameApiDesc;
	        GameApiDesc.create({
	            "nameGameApiDesc": req.body.nameGameApiDesc,
	            "descriptionGameApiDesc": req.body.descriptionGameApiDesc,
	            "typeGameApiDesc": req.body.typeGameApiDesc,
	            "paramGameApiDesc": req.body.paramGameApiDesc,
	            "returnGameApiDesc": req.body.returnGameApiDesc,
	        }).then(function (result) {
	            res.json({
	                "code": 0,
	                "nameGameApiDesc": result.nameGameApiDesc,
	                "descriptionGameApiDesc": result.descriptionGameApiDesc,
	                "typeGameApiDesc": result.typeGameApiDesc,
	                "paramGameApiDesc": result.paramGameApiDesc,
	                "returnGameApiDesc": result.returnGameApiDesc,
	            });
	        }).catch(function (err) {
	            res.json({
	                "code": 2,
	                "message": "Sequelize error"
	            })
	        });
	    } else {
	        res.json({
	            "code": 1,
	            "message": "Missing required parameters"
	        })
	    }
	});

}
