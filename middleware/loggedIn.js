module.exports = function(req, res, next){
	if(req.user){
		next();
	}
	else {
		req.flash('error', 'gotta login buddy')
		res.redirect('/auth/login')
	}
}