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



app.post('/', function(req, res){
	console.log(req.body.artist);
	spotifyApi.searchArtists(req.body.artist)
	//spotifyApi.getArtistTopTracks( "2jku7tDXc6XoB6MO2hFuqg", 'US')
 	.then(function(artistResult) {
 		//res.send(artistResult);
 		spotifyApi.getArtistTopTracks(artistResult.body.artists.items[0].id, 'US')
 		.then(function(trackResults){
 			//res.send(trackResults.body.tracks);
 			res.render('results', { artist: artistResult.body, tracks: trackResults.body.tracks });
 		})
 		.catch(function(err){
 			console.log(err);
 		});
	})
	.catch(err => {
		console.log('error', { error: err });
	});
});


app.get('/', function(req, res){
	results.findAll().then(function(result){
		res.render('artist', {result: result.body})
	})
			
	})
	


// app.post('/', function(req, res){
// 	console.log(req.body.artist);
// 	spotifyApi.getArtistTopTracks(req.body.tracks)
//   .then(function(result) {
//   		res.send(result.body);
//   		//res.render('results', {result: result.body});
// 	})
// 	.catch(err => {
// 		console.log('error', { error: err });
// 	})
// });









// `
// request token and start timeout loop
var tokenExpirationEpoch;

 var numberOfTimesUpdated = 0;

setInterval(function() {
  console.log(
    'Time left: ' +
      Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
      ' seconds left!'
  );

  // OK, we need to refresh the token. Stop printing and refresh.
  if (++numberOfTimesUpdated > 5) {
    clearInterval(this);

    // Refresh token and print the new time to expiration.
    spotifyApi.refreshAccessToken().then(
      function(data) {
        tokenExpirationEpoch =
          new Date().getTime() / 1000 + data.body['expires_in'];
        console.log(
          'Refreshed token. It now expires in ' +
            Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
            ' seconds!'
        );
      },
      function(err) {
        console.log('Could not refresh the token!', err.message);
      }
    );
  }
}, 1000);


app.listen(3000)








