module.exports = function(app, models){

    var msgError="";
	var bcrypt = require('bcrypt-nodejs');
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {
		
		if(req.session.type && req.session.type!=""){
			res.redirect("/");
		}else{
			res.render('login.ejs', { msgError: "", session : req.session });
		}
		
	});

	// process the login form
	app.post('/login', function (req, res, next) {
		if(req.session.type && req.session.type!=""){
			res.redirect("/");
		}else{
			msgError="";
			if(!req.body.username){
				msgError = "Veuillez saisir votre identifiant ! "  
				res.render('login.ejs', {msgError:msgError, session : req.session});
			}else if(!req.body.password){
				msgError = "Veuillez saisir votre mot de passe ! " 
				res.render('login.ejs', {msgError:msgError, session : req.session});			
			}else{
				User user = models.User;
				var request = {
                    attributes: ['loginUser', 'passwordUser', 'emailUser', 'typeUser'],
                    order: ['name'],
                    where: {
                        loginUser : req.user.login 
                    }
				}					
				user.find(request).then(function(result){
					if(result){
						if(bcrypt.compareSync(req.body.password, jsonBody.pwd)){
							req.session.cookie.maxAge = 1000 * 60 * 60;
							req.session.login = req.body.login;
							req.session.type = result.typeUser;
							res.redirect('/');	
						}else{
							res.render('login.ejs', { msgError: "Erreur combinaison login/mot de passe", session : req.session })
						}
					}else{
						res.render('login.ejs', { msgError: "Erreur combinaison login/mot de passe", session : req.session })
					}
				})	
			}	
		}
    });
	
	
	
}