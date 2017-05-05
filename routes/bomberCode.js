module.exports = function(app){

	app.get('/bomberCode', function(req, res) {
        /*if(req.session.type && req.session.type!=""){
            res.redirect("/");
        }else {*/
            res.render('BomberCode.ejs', {session: req.session});
        //}
	});

}