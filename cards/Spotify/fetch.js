import SpotifyWebApi from 'spotify-web-api-node';

export default function fetchData(config) {
  const { username, clientId, clientSecret, access_token, refresh_token } =
    config;

  const spotifyApi = new SpotifyWebApi({ clientId, clientSecret });
  spotifyApi.setRefreshToken(refresh_token);
  spotifyApi.setAccessToken(access_token);

  let user, tracks;

  return spotifyApi
    .refreshAccessToken()
    .then((data) => {
      spotifyApi.setAccessToken(data.body['access_token']);
      return spotifyApi.getMe();
    })
    .then((data) => {
      user = data.body;
      return spotifyApi.getMyRecentlyPlayedTracks();
    })
    .then((data) => {
      tracks = data.body.items;
      return { username, user, tracks };
    });
};
