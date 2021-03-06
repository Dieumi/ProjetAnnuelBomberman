var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, models, utils) {

    app.post("/user", function (req, res, next) {
        if (req.body.loginUser && req.body.emailUser && req.body.passwordUser) {
            var User = models.User;
            User.create({
                "loginUser": req.body.loginUser,
                "emailUser": req.body.emailUser,
                "passwordUser": bcrypt.hashSync(req.body.passwordUser, null, null),
                "typeUser": "user"
            }).then(function (result) {
                res.json({
                    "code": 0,
                    "loginUser": result.loginUser,
                    "emailUser": result.emailUser
                });
            }).catch(function (err) {
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                });
            });
        } else {
            res.json({
                "code": 1,
                "message": "Missing required parameters"
            });
        }
    });

    app.get("/user/find", function (req, res, next) {
        if (req.body.loginUser) {
            var User = models.User;
            var request = {
                attributes: ["loginUser", "passwordUser", "emailUser", "typeUser"],
                where: {
                    loginUser: req.body.loginUser
                }
            };
            User.find(request).then(function (result) {
                if (result) {
                    res.json({
                        "code": 0,
                        "idUser": result.idUser,
                        "loginUser": result.loginUser,
                        "emailUser": result.emailUser,
                        "typeUser": result.typeUser
                    });
                } else {
                    res.json({
                        "code": 3,
                        "message": "User not found"
                    });
                }
            });
        } else {
            res.json({
                "code": 1,
                "message": "Missing required parameters"
            });
        }
    });

    app.get("/user/find/:idUser", function (req, res, next) {
        if (req.params.idUser) {
            var User = models.User;
            var request = {
                where: {
                    idUser: req.params.idUser
                }
            };
            User.find(request).then(function (result) {
                if (result) {
                    res.json({
                        "code": 0,
                        "loginUser": result.loginUser
                    });
                } else {
                    res.json({
                        "code": 3,
                        "message": "User not found"
                    });
                }
            });
        } else {
            res.json({
                "code": 1,
                "message": "Missing required parameters"
            });
        }
    });

    app.get("/user/auth", function (req, res, next) {
        if (req.body.loginUser && req.body.passwordUser) {
            var User = models.User;
            var request = {
                attributes: ["idUser", "loginUser", "passwordUser", "emailUser", "typeUser"],
                where: {
                    loginUser: req.body.loginUser
                }
            };
            User.find(request).then(function (result) {
                if (result) {
                    if (bcrypt.compareSync(req.body.passwordUser, result.passwordUser)) {
                        res.json({
                            "code": 0,
                            "idUser": result.idUser,
                            "loginUser": result.loginUser,
                            "emailUser": result.emailUser,
                            "typeUser": result.typeUser
                        });
                    } else {
                        res.json({
                            "code": 3,
                            "message": "Wrong pwd"
                        });
                    }
                } else {
                    res.json({
                        "code": 3,
                        "message": "User not found"
                    });
                }
            }).catch(function (err) {
                res.json({
                    "code": 2,
                    "message": "Sequelize error",
                    "error": err
                });
            });
        } else {
            res.json({
                "code": 1,
                "message": "Missing required parameters"
            });
        }
    });

    app.get("/ListeUser", function (req, res, next) {
        var user = models.User;
        user.findAll().then(function (results) {
            res.send(results.count);
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            });
        });
    });

    app.get("/user/count", function (req, res, next) {
        var user = models.User;
        user.findAndCountAll().then(function (results) {
            res.json({
                "userCount": results.count
            });
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            });
        });
    });

    app.delete("/deleteuser/:id", function (req, res, next) {
        var user = utils.user;
        var u1 = new user();
        if (req.params.id) {
            u1.delete(req.params.id, function (result) {
                res.status(200);
                res.json({
                    "user": "deleted"
                });
            });
        }
    });

    app.get("/user/profile/:id", function (req, res, next) {
        var User = models.User;
        if (req.params.id) {
            User.findById(req.params.id).then(function (result) {
                if (result) {
                    res.json({
                        "code": 0,
                        "idUser": result.idUser,
                        "loginUser": result.loginUser,
                        "emailUser": result.emailUser,
                        "typeUser": result.typeUser,
                        "createdAt": result.createdAt
                    });
                } else {
                    res.json({
                        "code": 3,
                        "message": "User not found"
                    });
                }
            });
        }
    });

    app.post("/updateMyUser", function (req, res, next) {
        console.log(req.body.passwordUser);
        var request = {
            "where": {
                idUser: req.body.idUser
            }
        };

        var attributes = {};
        if (req.body.idUser) {
            attributes.idUser = req.body.idUser;
        }
        if (req.body.passwordUser) {
            attributes.passwordUser = bcrypt.hashSync(req.body.passwordUser, null, null);
        }
        var u1 = models.User;

        u1.update(attributes, request).then(function (results) {
            res.send(results);
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            });
        });

    });
};
