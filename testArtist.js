var SpotifyWebApi = require('spotify-web-api-node');


/**
 * This example retrieves the top tracks for an artist.
 * https://developer.spotify.com/spotify-web-api/get-artists-top-tracks/
 */

/**
 * This endpoint doesn't require an access token, but it's beneficial to use one as it
 * gives the application a higher rate limit.
 *
 * Since it's not necessary to get an access token connected to a specific user, this example
 * uses the Client Credentials flow. This flow uses only the client ID and the client secret.
 * https://developer.spotify.com/spotify-web-api/authorization-guide/#client_credentials_flow
 */
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

  spotifyApi.searchArtists('tory lanez')
  .then(function(data) {
    console.log('Search artists by "gucci"', data.body);
  }, function(err) {
    console.error(err);
  });

})