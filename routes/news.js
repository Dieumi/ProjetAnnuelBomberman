module.exports = function(app, urlApi){

    var msgError = "";
    var rp = require("request-promise");

    app.get('/news', function(req, res) {
        if(req.session.type === "admin") {
            res.render('news.ejs', { session : req.session });
        }else{
            res.redirect("/");
        }
    });

    app.post('/new', function (req, res, next) {
        if (req.session.type !== "admin") {
            res.redirect("/");
        } else {
            console.log(urlApi);
            rp({
                url: urlApi + "/post",
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                json:{
                    "titlePost": req.body.titlePost,
                    "textPost": req.body.textPost,
                    "authorPost": req.session.login
                }
            }).then(function(body){
                if(body){
                    res.redirect("/");
                }
            }).catch(function(err){
                res.render("news.ejs", { msgError: "Erreur inconnu. Merci de réesayer.", session : req.session })
            })
        }
    });
};