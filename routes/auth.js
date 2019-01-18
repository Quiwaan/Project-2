var express = require('express');
var passport = require('../config/passportConfig')
var router = express.Router();
var db = require('../models')

router.get('/login', function(req, res){
	res.render('auth/login');
})

router.get('/signup', function(req, res){
	res.render('auth/signup', { previousData: null });
})


router.post('/signup', function(req, res, next){
	if(req.body.password != req.body.password_verify){
		req.flash('error', 'passwords must match!');
		req = deletePassword(req, res);
		res.render('auth/signup', { previousData: req.body });
	}
	else{
	  console.log(req.body);
	  db.user.findOrCreate({
	  	where: { username: req.body.username },
	  	defaults: req.body
	  })
	  .spread(function(user, wasCreated){
	  	console.log('got to promise');
	  	if(wasCreated){
	  		passport.authenticate('local', {
			successRedirect: '/profile',
			successFlash: 'login successful',
			failureRedirect: '/auth/login',
			failureFlash: 'Wrong Creds'
		})(req, res, next);

	  	} else {
	  		req.flash('error', 'username already in use')
	  		res.render('auth/signup', { previousData: req.body, alerts: req.flash() });
	  	}
	  })
	  .catch(function(err){
	  	if(err && err. errors){
	  		err.errors.forEach(function(e){
	  			console.log('error type')
	  			if(e.type == 'ValidationError'){
	  				req.flash('error', 'ValidationError: ' + e.message);
	  			}
	  			else {
	  				console.log('error (not validation)', e)
	  			}
	  		})
	  	}
	
	  	res.render('auth/signup', { previousData: req.body, alerts: req.flash() });
	  })
	}
})


router.get('/logout', function(req, res){
	req.logout();
	req.flash('sucess', 'See ya when we see ya!');
	res.redirect('/');
})


// facebook specific routes
router.get('/facebook', passport.authenticate('facebook', {
	scope: ['public_profile', 'email']
}));

router.get('/callback/facebook', passport.authenticate('facebook', {
	successRedirect: '/profile',
	successFlash: 'Login successful',
	failureRedirect: '/auth/login',
	failureRedirect: "facebook dont know you bro"
}))


module.exports = router;