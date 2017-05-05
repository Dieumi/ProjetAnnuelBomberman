module.exports = function(app){

	app.get('/myBomberman', function(req, res) {
        if(req.session.type && req.session.type!=""){
            res.redirect("/");
        }else {
            res.render('myBomberman.ejs', {session: req.session});
        }
	});

}