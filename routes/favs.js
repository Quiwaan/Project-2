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
})



router.get('/fav-tracks', loggedIn, function(req, res){
	req.user.getTracks().then(function(tracks){
		console.log("TRACKS:"+tracks);
		res.render('./favs/fav-tracks', { tracks: tracks })
	})
})


router.delete('fav-artist/:artist', function(req, res){
	req.user.removeArtist().then(function(rmArtists){
		console.log("rmArtists:"+rmArtists)
	})
})


module.exports = router;