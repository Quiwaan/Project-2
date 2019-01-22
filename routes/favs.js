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


router.delete('/fav-artist', function(req, res){ 
	 db.userArtist.destroy({
	 	where: {
	 		userId: req.user.id,
	 		artistId: +req.body.artistId
	 	}
	 })
	 .then(function(data){
	 	res.redirect('/favs/fav-artist')
	 })
})


router.put('/fav-artist/:id', function(req, res) {
    models.User
        .update({
            name: req.body.name,
            username: req.body.username
        }, {
            where: {
                id: req.params.userId
            }
        }).then(function() {
            res.redirect('./favs/fav-artist');
        });
});


	 	
	






module.exports = router;