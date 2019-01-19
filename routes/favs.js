var express = require('express');
var passport = require('../config/passportconfig')
var router = express.Router();
var db = require('../models')

var loggedIn = require('../middleware/loggedIn');

router.get('/fav-artist', loggedIn, function(req, res){
	console.log("ARE WE EVEN HERE TH?????");
	console.log("REQ.USER:"+req.user);
	req.user.getArtists().then(function(artists){
		console.log("ARTISTS:"+artists);
		res.render('./favs/fav-artist', { artists: artists })
	})
	// db.artist.find({
	// 	where: req.body,
	// }).then(function(artist){
	// 	artist.getUsers().then(function(artistid){
	// 		res.render('./favs/fav-artist', { artistid: artistid })
	// 	})
	// })
})

module.exports = router;