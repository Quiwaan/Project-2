module.exports = function(req, res, next){
	if(req.user && req.user.admin){
		next();
	}
	else {
		req.flash('error', 'gotta login buddy')
		res.redirect('/profile')
	}
}