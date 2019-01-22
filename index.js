require('dotenv').config();
var express = require('express');
var app = express();
var request = require('request');
var flash = require('connect-flash');
var parser = require('body-parser'); 
var layouts = require('express-ejs-layouts');
var SpotifyWebApi = require('spotify-web-api-node');
var passport = require('./config/passportconfig');
var session = require('express-session');
var methodOverride = require('method-override');

var loggedIn = require('./middleware/loggedIn');
var db = require("./models");


// Tell express what view engine you want to use
app.set('view engine', 'ejs');

// Include any middleware here
app.use(layouts);
app.use(methodOverride('_method'));
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSIONS_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next){
  res.locals.alerts = req.flash();
  res.locals.user = req.user;
  next();
})


var spotifyApi = new SpotifyWebApi({
  clientId: process.env.client_Id,
  clientSecret: process.env.client_Secret
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(function(data) {
    // Set the access token on the API object so that it's used in all future requests
    spotifyApi.setAccessToken(data.body['access_token']);
  })

app.get('/', loggedIn, function(req, res){
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
 			//res.send(artistResult.body);
 			res.render('results', { artist: artistResult.body, tracks: trackResults.body.tracks.slice( 0 )});
 		})
 		.catch(function(err){
 			console.log(err);
 		});
	})
	.catch(err => {
		console.log('error', { error: err });
	});
});


app.get('/artist', function(req, res){
	db.artist.findAll().then(function(artist){
		res.render('artist', { artist: artist })
	})		
})
	

app.post('/artist', loggedIn, function(req, res){
  db.artist.findOrCreate({
    where: req.body,
  }).spread(function(artist, created) {
    artist.addUsers(req.user.id);
  }).catch(function(err) {
    console.log(err);
  });
})   




app.get('/tracks', function(req, res){
  db.track.findAll().then(function(track){
    res.render('tracks', { track: track })
  })
})


app.post('/tracks', loggedIn, function(req, res){
  db.track.findOrCreate({
    where: req.body,
  }).spread(function(track, created) {
    track.addUsers(req.user.id);
    }).catch(function(err) {
      console.log(err);
    });
})   




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


app.use('/profile', require('./routes/profiles'))
app.use('/auth', require('./routes/auth'));
app.use('/favs', require('./routes/favs'));
app.listen(process.env.Port || 3000, function(){
  console.log('Hey yall')
})









