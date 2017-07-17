module.exports = function (app, models) {

    app.get("/avatarBot", function (req, res, next) {
        var AvatarBot = models.AvatarBot;
        AvatarBot.findAll().then(function (results) {
            res.send(results);
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            });
        });
    });

    app.post("/avatarBot", function (req, res, next) {
        if (req.body.nameAvatarBot) {
            var AvatarBot = models.AvatarBot;
            AvatarBot.create({
                "nameAvatarBot": req.body.nameAvatarBot,
            }).then(function (result) {
                res.json({
                    "code": 0,
                    "idAvatarBot": result.idAvatarBot,
                    "nameAvatarBot": result.nameAvatarBot
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


};