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
				
			}	
		}
    });
	
	
	
}