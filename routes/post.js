module.exports = function(app, models,utils) {
    app.post("/post", function(req, res, next) {
        if (req.body.titlePost && req.body.textPost && req.body.authorPost) {
            var Post = models.Post;
            Post.create({
                "titlePost" : req.body.titlePost,
                "textPost" : req.body.textPost,
                "authorPost" : req.body.authorPost
            }).then(function(result){
                res.json({
                    "code" : 0,
                    "titlePost" : result.titlePost,
                    "textPost" : result.textPost,
                    "authorPost" : result.authorPost
                });
            }).catch(function(err){
                res.json({
                    "code" : 2,
                    "message" : "Sequelize error",
                    "error": err
                });
            });
        } else {
            res.json({
                "code" : 1,
                "message" : "Missing required parameters"
            });
        }
    });

    app.get("/posts", function (req, res, next) {
        var Post = models.Post;
        Post.findAll().then(function (results) {
            res.json({
                "code" : 0,
                results : results
            })
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            });
        })
    });

    app.get("/posts/latest", function (req, res, next) {
        var Post = models.Post;
        Post.findAll({
            order: '`createdAt` DESC',
            limit: 3
        }).then(function (results) {
            res.json({
                "code" : 0,
                "results" : results
            })
        }).catch(function (err) {
            res.json({
                "code": 2,
                "message": "Sequelize error",
                "error": err
            })
        })
    });
};
