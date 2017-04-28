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
			if(!req.body.login){
				msgError = "Veuillez saisir votre identifiant ! "  
				res.render('login.ejs', {msgError:msgError, session : req.session});
			}else if(!req.body.password){
				msgError = "Veuillez saisir votre mot de passe ! " 
				res.render('login.ejs', {msgError:msgError, session : req.session});			
			}else{
				var user = models.User;
				var request = {
                    attributes: ['loginUser', 'passwordUser', 'emailUser', 'typeUser'],
                    where: {
                        loginUser : req.body.login 
                    }
				}					
				user.find(request).then(function(result){
					if(result){
						if(bcrypt.compareSync(req.body.password, result.passwordUser)){
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