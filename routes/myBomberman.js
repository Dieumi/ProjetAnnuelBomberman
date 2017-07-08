module.exports = function(app, models, urlApi){

    var rp = require('request-promise')
    var api = models.myApi;

	app.get('/myBomberman', function(req, res) {
        if(!req.session.type){
            res.redirect("/");
        }else {
            //On recup la liste de bot :
            rp({
                url: urlApi + "/botByUser",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                json: {
                    "userIdBot": req.session.idUser
                }
            }).then(function(body) {
                res.render('myBomberman.ejs', {
                    session: req.session,
                    listBot: body
                });
            })

        }
	});
  app.post('/index', function(req, res) {
        if(!req.session.type){
            res.redirect("/");
        }else {
            //On recup la liste de bot :
            console.log(req.body)
            res.render('index.ejs', {
                session: req.session,
                idAd:req.body.idAd,
                idBotAd: req.body.idbotAd,
                idBot:req.body.idbot,
                iduser:req.body.iduser,
                namebot:req.body.namebot,
                namebotAd: req.body.namebotAD,
                api: urlApi,
                codeBot: req.body.codeBot,
                codeBotAd: req.body.codeBotAd
            });


        }
  });
  app.get('/Choix', function(req, res) {
        if(!req.session.type){
            res.redirect("/");
        }else {
            //On recup la liste de bot :
            rp({
                url: urlApi + "/botByUser",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                json: {
                    "userIdBot": req.session.idUser
                }
            }).then(function(body) {
              
                res.render('Choix.ejs', {
                    session: req.session,
                    listBot: body
                });
            })


        }
  });


}
