import fetch from 'node-fetch';

export default function fetchData(config) {
  const { key, steamid, username, ignoreAppids } = config;
  return Promise.all(
    [
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamid}`,
      `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${key}&steamid=${steamid}`,
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamid}&include_appinfo=1&format=json`
    ].map(fetch)
  )
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(([summary, recent, owned]) => ({
      username,
      steamid,
      ignoreAppids,
      user: summary.response.players[0],
      recent: recent.response.games,
      owned: owned.response.games
    }));
}
