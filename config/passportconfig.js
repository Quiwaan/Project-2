var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

//provide serialize/deserialize 
passport.serializeUser(function(user, callback){
	//callback(errormessage, user data)
	callback(null, user.id);
});
passport.deserializeUser(function(id, callback){
	db.user.findByPk(id)
	.then(function(user){
		callback(null, user);
	})
	.catch(function(err){
		callback(err, null)
	})
});

//actual logging in (authentication)
passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, function(username, password, callback){
	db.user.findOne({
		where: {username: username}
	})
	.then(function(foundUser){
		console.log("HELLO!!!")
		if(!foundUser || !foundUser.validPassword(password)){
			console.log("user creds failed!!!!!!!!")
			callback(null, null)
		}
		else {
			console.log("user creds match!!@!!!!!!!!!")
			callback(null, foundUser)
		}
	})
	.catch(function(err){
		callback(err, null);
	})

}))



//make sre i can include this module in other pages

module.exports = passport;
