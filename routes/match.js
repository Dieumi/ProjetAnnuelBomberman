var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models,utils) {

    app.post("/match", function(req, res, next) {
        if (req.body.idWinner) {
            var date = new Date();
            var Match = models.Match;
            Match.create({
                "matchNull": req.body.matchNull,
                "idWinner" : req.body.idWinner,
                "idLoose" : req.body.idLoose,
                "dateMatch" : date,
                "idMapMatch" : req.body.idMapMatch,
                "idTournamentMatch" : 0
            }).then(function(result){
                res.json({
                    "code" : 0,
                    "idMatch" : result.idMatch,
                    "idWinner" : result.idWinner,
                    "idLoose" : result.idLoose,
                    "dateMatch" : result.dateMatch,
                    "idMapMatch" : result.idMapMatch,
                    "idTournamentMatch" : result.idTournamentMatch
                });
            }).catch(function(err){
                res.json({
                    "code" : 2,
                    "message" : "Sequelize error",
                    "error" : err
                });
            });
        } else {
            res.json({
                "code" : 1,
                "message" : "Missing required parameters"
            });
        }
    });

    app.get("/ListMatch", function (req, res, next) {
        var match = models.Match;
        match.findAll().then(function (results) {
            res.send(results);
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            });
        });
    });

    app.get("/updatematch/:id", function (req, res, next) {
        var match = models.Match;
        var request = {
            "where": {
                idMatch: req.params.id
            }
        };
        match.find(request).then(function (results) {
            res.send(results);
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            });
        });
    });

    app.post("/updatematch", function (req, res, next) {
        var match = utils.Match;
        var request = {
            "where": {
                idMatch: req.body.idMatch
            }
        };
        var attributes = {};
        if (req.body.idWinner) {
            attributes.idWinner = req.body.idWinner;
        }
        if (req.body.matchNull) {
            attributes.idWinner = req.body.matchNull;
        }

        if (req.body.idLoose) {
            attributes.idLoose = req.body.idLoose;
        }
        if (req.body.dateMatch) {
            attributes.dateMatch = req.body.dateMatch;
        }
        if (req.body.idMapMatch) {
            attributes.idMapMatch = req.body.idMapMatch;
        }
        if (req.body.idTournamentMatch) {
            attributes.idTournamentMatch = req.body.idTournamentMatch;
        }
        var u1 = new match();
        u1.update(request, attributes, function (err, data) {
            res.send("/ListMatch");
        });
    });

    app.get("/matchs/:id", function (req, res, next) {
        var match = models.Match;
        match.findAll({
            where: {
                $or : [{
                    idLoose: req.params.id
                }, {
                    idWinner: req.params.id
                }]
            },
            order: [
                ['createdAt', 'DESC']
            ]

        }).then(function (body) {
            res.json({
                "code": 0,
                "results": body
            });
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            });
        });
    });

};
