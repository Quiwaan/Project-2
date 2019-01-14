var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require("body-parser");
var session = require("express-session");
var SpotifyWebApi = require('spotify-web-api-node');


var spotifyApi = new SpotifyWebApi({
	clientId: 'd459153dd3f7453c826a6073f648cfbe',
	clientSecret: '938e00570fa1497a8b26925c01ab7eaa'
});

spotifyApi.setAccessToken('BQAByYTEylLqfYWNvDkk6vivN2oGrl061wPcSokggZWJZQEjsPXFvsru_v0snqF8hahfM959BiRumBCPI5A');
  
app.get('/', function(req, res){
	
})







app.listen(3000)








