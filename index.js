var express = require('express');
var app = express();
var request = require('request');
var layouts = require('express-ejs-layouts');
var session = require("express-session");
var SpotifyWebApi = require('spotify-web-api-node');


// Tell express what view engine you want to use
app.set('view engine', 'ejs');

// Include any middleware here
app.use(layouts);
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));


var spotifyApi = new SpotifyWebApi({
  clientId: 'd459153dd3f7453c826a6073f648cfbe',
  clientSecret: '938e00570fa1497a8b26925c01ab7eaa'
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(function(data) {
    // Set the access token on the API object so that it's used in all future requests
    spotifyApi.setAccessToken(data.body['access_token']);
  })

app.get('/', function(req, res){
	res.render('search-form');
})

// app.post('/', function(req, res){
// 	console.log(req.body.artist);
// 	spotifyApi.searchArtist(req.body.artist.trim())
// 	.then(result => {
// 		res.render('results', { results: result.body });
// 		console.log(results)
// 	})
// 	.catch(err => {
// 		res.render('error', { error: err });
// 	})
// });


app.post('/', function(req, res){
	console.log(req.body.artist);
	spotifyApi.searchArtists(req.body.artist)
  .then(function(result) {
  		//res.send(result.body);
		res.render('results', {result: result.body});
		
	})
	.catch(err => {
		console.log('error', { error: err });
	})
});

// `
// request token and start timeout loop

app.listen(3000)








