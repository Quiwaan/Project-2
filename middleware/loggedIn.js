module.exports = function(req, res, next){
	if(req.user){
		console.log('what about now though')
		next();
	}
	else {
		req.flash('error', 'gotta login buddy')
		res.redirect('/auth/login')
	}
}