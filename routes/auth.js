var express = require('express');
var passport = require('../config/passportconfig')
var router = express.Router();
var db = require('../models')

router.get('/login', function(req, res){
	res.render('auth/login');
})


router.get('/signup', function(req, res){
	res.render('auth/signup', { previousData: null });
})


router.post('/signup', function(req,res){
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
	  		console.log('was created');
	  		req.flash('success')
	  		res.redirect('/profile')

	  	} else {
	  		req.flash('error', 'username already in use')
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

router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	successFlash: 'login successful',
	failureRedirect: '/auth/login',
	failureFlash: 'Wrong Creds'
}));


router.get('/logout', function(req, res){
	req.logout();
	req.flash('sucess', 'See ya when we see ya!');
	res.redirect('/');
})




module.exports = router;