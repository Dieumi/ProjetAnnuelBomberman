module.exports = function(app, models, urlApi){

    var rp = require("request-promise");
    var api = models.myApi;
    var fs = require("fs");
    app.get("/myBomberman", function(req, res) {
        if(!req.session.type){
            res.redirect("/");
        }else {
            //On recup la liste de bot :
            rp({
                url: urlApi + "/botByUser",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                json: {
                    "userIdBot": req.session.idUser
                }
            }).then(function(body) {
                res.render("myBomberman.ejs", {
                    session: req.session,
                    listBot: body
                });
            });
        }
    });

    app.post("/index", function(req, res) {
        if(!req.session.type){
            res.redirect("/");
        }else {


            /*On cree un fichier tmp pour le joueur adversaire dans le but de remplacer les player en player2*/
            var file = req.body.codeBot.substring(8, req.body.codeBot.length);
            var fileP2 = req.body.codeBotAd.substring(8, req.body.codeBotAd.length - 3) + "P2.js";
            var contentP2 = fs.readFileSync("./" + req.body.codeBotAd, "UTF-8");
            contentP2 = contentP2.replace(/player/g, "player2");
            fs.writeFile("botFiles/"+fileP2, contentP2, function (err) {
                if (err)  {
                    return console.log(err);
                }
            });

            Console.log("choix");
            Console.log(req.body.idbotAd);
            res.render("index.ejs", {

                session: req.session,
                idAd:req.body.idAd,
                idBotAd: req.body.idbotAd,
                idBot:req.body.idbot,
                iduser:req.body.iduser,
                namebot:req.body.namebot,
                namebotAd: req.body.namebotAD,
                api: urlApi,
                codeBot: file,
                codeBotAd: fileP2,
                type: "game"
            });
        }
    });

    app.get("/Choix", function(req, res) {
        if(!req.session.type){
            res.redirect("/");
        } else {
            //On recup la liste de bot :
            rp({
                url: urlApi + "/botByUser",
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                json: {
                    "userIdBot": req.session.idUser
                }
            }).then(function(body) {

                res.render("Choix.ejs", {
                    session: req.session,
                    listBot: body
                });
            });
        }
    });
};
