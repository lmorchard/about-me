const SpotifyWebApi = require('spotify-web-api-node');
const config = require(__dirname + '/../../../config').Spotify;

const code = process.argv[2];

const spotifyApi = new SpotifyWebApi(Object.assign({
  redirectUri: 'https://example.com/callback'
}, config));

if (!code) {
  const scopes = [
    'user-read-recently-played',
    'user-read-currently-playing'
  ];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  console.log(authorizeURL);
} else {
  spotifyApi.authorizationCodeGrant(code)
   .then(function(data) {

     console.log(JSON.stringify(data.body));

    // Set the access token on the API object to use it in later calls
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

